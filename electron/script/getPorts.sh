function read_ports
{
    counter=0
    name="$(pacmd list-cards | grep "device.product.name" | cut -d '=' -f 2)"
    name=${name//\"/''}
    ports="$(pacmd list-cards | grep "\[Out\]")"
    while read line
    do
        is_available=$(echo $line | cut -d ':' -f 3 | sed -e 's/)/''/g' | xargs )
        # echo $is_available
        ports[$counter]='"'$(echo $line | cut -d ':' -f 1 )'"'
        ports[$counter]=${ports[$counter]//\[Out\]/}" /"$name" / ("$is_available")"
        ports[$counter]='"'${ports[$counter]//\"/''}'"',
        let "counter+=1"
    done <<< $ports
    echo {'"ports"':[
    for value in "${ports[@]}"
        do
            echo $value
        done
    echo '""'
    echo ]}
}
read_ports