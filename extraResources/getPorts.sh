function read_ports
{
    output="$(pacmd list-cards)"
    name="$( echo "$output" | grep "device.product.name" | cut -d '=' -f 2)"
    name=${name//\"/''}
    ports_output="$(echo "$output" | grep -A 50 'ports:' | sed -E '/properties:|available: no|^[[:space:]]*$|ports|mic|Mic|MIC|microphone|icon_name/d')"
    ports=()
    while read line
    do
        port="{"
        port_name="$(echo "$line" | cut -d ':' -f 1 )"
        port+="\"name\"":\"$port_name\",
        port_name2="$(echo "$port_name" | cut -d ' ' -f 2 )"
        port+="\"fullName\"":\"$port_name2" -"$name\""}",
        ports+=$port
     
    done <<< $ports_output
    echo {'"ports"':[
    for value in "${ports[@]}"
        do
            echo $value
        done
    echo '""'
    echo ]}
}
read_ports