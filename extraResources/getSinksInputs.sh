output="$(pacmd list-sink-inputs)"
number_of_sink="$(echo "$output" | grep 'available' | cut -d ' ' -f 1)"

result=()
function get_sink_inputs {

    if [ $number_of_sink -eq 0 ]; then
        return ;
    fi

    counter=0
    index="$(echo "$output" | grep 'index:')"
    while read line
    do
        result[$counter]+='{"index"':$(echo $line | cut -d ':' -f 2 | xargs),
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$index"


    counter=0
    icon_name="$(echo "$output" | grep 'application.icon_name')"
    while read line
    do
        result[$counter]+='"icon_name"':'"'$(echo $line | cut -d '=' -f 2 | xargs)'"',
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$icon_name"


    counter=0
    app_names="$(echo "$output" | grep -w "application.name" | sed '/application-name/d' )"
    while read line
    do
        result[$counter]+='"applicationName"':'"'$(echo $line | cut -d '=' -f 2 | xargs)'"',
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$app_names"


    counter=0
    volume="$(echo "$output" | grep 'volume'  )"
    while read line
    do
        result[$counter]+='"left"':''$(echo $line | cut -d '/' -f 2 | sed 's/%//'  | xargs)'',
        result[$counter]+='"right"':''$(echo $line | cut -d '/' -f 4 | sed 's/%//'  | xargs)'},'
        let "counter+=1"
        if [ $counter -gt $number_of_sink ]; then
            break
        fi
    done <<< "$volume"


    echo {'"results"':[
    for value in "${result[@]}"
    do
        echo "$value"
    done
    echo '{}'
    echo ]}
}
get_sink_inputs

