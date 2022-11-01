# pactl list sinks
sinks="$(pactl list sinks  | grep -e "Sink\|State\|Volume\|Ports:\|device.product.name\|balance\|\[Out]\\|Active Port")"
sink_arr=()
number_of_sink="$(echo "$sinks" | grep -c "Sink")"
ports=()
# echo "number of sink  $number_of_sink" 
# initialize sink arr 
for (( c=1; c<=$number_of_sink; c++ ))
do 
    sink_arr+=("{")
done;


function read_states
{
    counter=0
    states="$(echo "$sinks"| grep "State")"
    while read line
    do
        sink_arr[$counter]+='"state"':'"'$(echo $line | cut -d ' ' -f 2 )'"',
        #track counter
        let "counter+=1"    
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< $states
}


function read_names
{
    counter=0
    names="$(echo "$sinks"| grep "device.product.name")"
    while read line
    do
        sink_arr[$counter]+='"name"':$(echo $line | cut -d '=' -f 2 ),
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$names"
}

function read_volume_balance {
    counter=0
    volume_balance="$(echo "$sinks"| grep "balance")"
    while read line
    do
        sink_arr[$counter]+='"balance"':$(echo $line | cut -d ' ' -f 2 ),
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$volume_balance"
}

function read_volume
{
    counter=0
    volumes="$(echo "$sinks"| grep "Volume: front")"
    while read line
    do
        left_volume=$(echo $line | cut -d '/' -f 2 | sed -e 's/%/''/g'  | xargs)
        right_volume=$(echo $line | cut -d '/' -f 4 | xargs )
        sink_arr[$counter]+='"leftVolume"':'"'$left_volume'"',
        sink_arr[$counter]+='"rightVolume"':'"'$left_volume'"',
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$volumes"
}

function read_active_port
{
    counter=0
    active_ports="$(echo "$sinks"| grep "Active Port")"
    while read line
    do
        sink_arr[$counter]+='"activePort"':'"'$(echo $line | cut -d ' ' -f 4 | xargs)'"'},
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$active_ports"
}
# function read_current_sink
# {
#     current_sink="$(pacmd list-sinks| grep "* index:" | cut -d ':' -f 2 | xargs)"
#     echo "$current_sink"
# }


read_states
read_names
read_volume_balance
read_volume
read_active_port
# read_current_sink

#get value of sink arr
echo {'"sinks"':[
for value in "${sink_arr[@]}"
do
    echo $value
done
echo '""'
echo ]}
# echo ${sink_arr[*]} 
# a="$(pactl list sinks  | grep -e "Sink\|State\|Volume\|device.product.name\|\[Out]\\|Active Port")"