devices_ouput="$(bluetoothctl -- devices | cut -f2 -d ' ' )";

devices="$(while read uuid;
do bluetoothctl info $uuid | sed '/CHG\|random\|not available/,+7d'
done <<< $devices_ouput)"

devices_info=()

# echo "$devices"
number_of_devices="$(echo "$devices" | grep -c "Device")"
# echo "$number_of_devices"

for (( c=1; c<=$number_of_devices; c++ ))
do 
    devices_info+=("{")
done;



function read_address
{
    counter=0
    mac_addresses="$(echo "$devices"| grep "Device")"
    while read line
    do
        devices_info[$counter]+='"MACAddress"':'"'$(echo $line | cut -d ' ' -f 2 | xargs)'"',
        devices_info[$counter]+='"type"':'"'$(echo $line | cut -d ' ' -f 3 | xargs | sed -e 's/(/''/g;s/)/''/g')'"',

        let "counter+=1"
        if [ $counter -gt $number_of_devices ]; then
            break
        fi
    done <<< "$mac_addresses"
}

function read_name
{
    counter=0
    names="$(echo "$devices"| grep "Alias")"
    while read line
    do
        devices_info[$counter]+='"Name"':'"'$(echo $line | cut -d ':' -f 2 | xargs)'"',
        let "counter+=1"
        if [ $counter -gt $number_of_devices ]; then
            break
        fi
    done <<< "$names"
}

function read_status
{
    counter=0
    pair_status="$(echo "$devices"| grep "Paired")"
    while read line
    do
        devices_info[$counter]+='"paired"':'"'$(echo $line | cut -d ':' -f 2 | xargs)'"',
        let "counter+=1"
        if [ $counter -gt $number_of_devices ]; then
            break
        fi
    done <<< "$pair_status"


    counter=0
    trusted_status="$(echo "$devices"| grep "Trusted")"
    while read line
    do
        devices_info[$counter]+='"trusted"':'"'$(echo $line | cut -d ':' -f 2 | xargs)'"',
        let "counter+=1"
        if [ $counter -gt $number_of_devices ]; then
            break
        fi
    done <<< "$trusted_status"


    counter=0
    blocked_status="$(echo "$devices"| grep "Blocked")"
    while read line
    do
        devices_info[$counter]+='"blocked"':'"'$(echo $line | cut -d ':' -f 2 | xargs)'"',
        let "counter+=1"
        if [ $counter -gt $number_of_devices ]; then
            break
        fi
    done <<< "$blocked_status"

    counter=0
    connected_status="$(echo "$devices"| grep "Connected")"
    while read line
    do
        devices_info[$counter]+='"connected"':'"'$(echo $line | cut -d ':' -f 2 | xargs)'"'},
        let "counter+=1"
        if [ $counter -gt $number_of_devices ]; then
            break
        fi
    done <<< "$connected_status"
}

read_address
read_name
read_status


echo {'"devices"':[
for value in "${devices_info[@]}"
do
    echo $value
done
echo '{}'
echo ]}
# echo "${devices_info[*]}"