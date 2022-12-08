import create from "zustand";
import _ from "lodash";
export const useBrightnessStore = create((set, get) => ({
    volume: 0,
    check: false,
    temparature: 1700,
    schedule: true,
    from : {
        hour : 0,
        min: 0,
    },
    timeFrom: 0.0,
    to : {
        hour : 0,
        min: 0,
    },
    timeTo: 0.0,
    changeVolume(value) {
        window.brightnessAPI.changeVolume(value);
        set(() => ({ volume: value }));
    },
    changeNightLight(value) {
        window.brightnessAPI.changeNightLight(value);
        set(() => ({
            check: value,
        }));
    },
    changeTemperature(value) {
        window.brightnessAPI.changeTemperature(value);
        set(() => ({
            temparature: value,
        }));
    },
    changeSchedule(value) {
        window.brightnessAPI.changeSchedule(value);
        set(() => ({
            schedule: value,
        }));
    },

    transformTime(data) {
        const hour =Math.floor(data);
        const min = Math.round((data - hour) * 60 ); 
        return {hour , min}
    },

    convertTimeToNumber(hour , min) {
        return hour + min / 60;
    },

    changeTimeFrom(hour , min) {
        
        if(hour >= 24) hour = 0
        if(hour < 0 ) hour = 23

        if(min < 0) {
            min = 59
        }else if(min >= 60) {
            min = 0 
        }

        set(() => ({from : {hour , min}}))

        const data = get().convertTimeToNumber(get().from.hour , get().from.min);
        window.brightnessAPI.changeTimeFrom(data);
    },
    changeTimeTo(hour, min) {
            if(hour >= 24) hour = 0
            if(hour < 0 ) hour = 23
    
            if(min < 0) {
                min = 59
            }else if(min >= 60) {
                min = 0 
            }
    
            set(() => ({to : {hour , min}}))
    
            const data = get().convertTimeToNumber(get().to.hour , get().to.min);
            window.brightnessAPI.changeTimeTo(data);
    },
    updateBrightness(data) {
        console.log(data.temparature);
        if(get().volume !== data.volume){
            set(() => ({
                volume : data.volume
            }))
        }
        if(get().check !== data.check){
            set(() => ({
                check: data.check
            }))
        }
        if(get().temparature !== data.temparature){
            set(() => ({
                temparature: data.temparature
            }))
        }
        if(get().schedule !== data.schedule){
            set(() => ({
                schedule: data.schedule
            }))
        } 
        if(get().timeFrom !== data.timeFrom){
            const transformData  = get().transformTime(data.timeFrom)
            set(() => ({
                from : transformData,
                timeFrom: data.timeFrom
            }))
        } 
        if(get().timeTo !== data.timeTo){
            const transformData  = get().transformTime(data.timeTo)
            set(() => ({
                to : transformData,
                timeTo: data.timeTo
            }))
        }  
    }

}));
