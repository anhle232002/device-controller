devices_output="$(bluetoothctl devices | sed '/CHG/d' )"
# echo "$devices_output"

#sed '/CHG/d' remove line with pattern
devices=()

while read line
do 
    data="{"
    address="$(echo $line | cut -d ' ' -f 2 )"
    information="$(bluetoothctl info $address | sed '/CHG/d')"

    if grep -q "public" <<< "$information"; then
        address="$(echo "$information"fbd | grep "Device")"
        data+='"address"':'"'$(echo $address | cut -d ' ' -f 2 | xargs)'"',
        name="$(echo "$information" | grep "Name")"
        data+='"name"':'"'$(echo $name | cut -d ':' -f 2 | xargs)'"',
        paired="$(echo "$information" | grep "Paired")"
        data+='"paired"':'"'$(echo $paired | cut -d ':' -f 2 | xargs)'"',
        trusted="$(echo "$information" | grep "Trusted")"
        data+='"trusted"':'"'$(echo $trusted | cut -d ':' -f 2 | xargs)'"',
        blocked="$(echo "$information" | grep "Blocked")"
        data+='"blocked"':'"'$(echo $blocked | cut -d ':' -f 2 | xargs)'"',
        connected="$(echo "$information" | grep "Connected")"
        data+='"connected"':'"'$(echo $connected | cut -d ':' -f 2 | xargs)'"''}',

        devices+=$data
    fi

    # echo "$information"
# bluetoothctl info $address
done <<< "$devices_output"
echo {'"devices"':[
for value in "${devices[@]}"
do
    echo "$value"
done
echo '{}'
echo ]}