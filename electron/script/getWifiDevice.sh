output="$(nmcli device wifi)"
numberOfNetwork="$(echo "$output" | wc -l)"
availableNetWorks=()
function getNetworks
{
    networks="$(echo "$output" | sed '1d' | sed -e 's/*/''/g' )"
    numberOfNetwork="$(echo "$networks" | wc -l)"
    counter=0
    while read line
        do
            data1=$(echo "$line"| sed -e 's/Infra/|/g' | cut -d '|' -f 1)
            data2=$(echo "$line" | sed -e 's/Infra/|/g' | cut -d '|' -f  2)

            availableNetWorks[$counter]+={'"BSSID"':'"'$(echo $data1 | cut -d ' ' -f 1 )'"',
            availableNetWorks[$counter]+='"name"':'"'$(echo $data1 | cut -d ' ' -f2- )'"',
            availableNetWorks[$counter]+='"rate"':'"'$(echo $data2 | cut -d ' ' -f 2 )'"',
            availableNetWorks[$counter]+='"signal"':'"'$(echo $data2 | cut -d ' ' -f 4 )'"'},

            let "counter+=1"
        done <<< "$networks"
}

getNetworks


echo {'"networks"':[
for value in "${availableNetWorks[@]}"
do
    echo $value
done
echo '""'
echo ]}