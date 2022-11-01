#rfkill unblock bluetooth;
#bluetoothctl -- power on;
#timeout 5s bluetoothctl -- scan on;
#clear;
bluetoothctl -- devices | cut -f2 -d' ' | while read uuid; do echo "result:"
bluetoothctl -- info $uuid
done | grep -e "result:\|Device\|Connected\|Name" ;