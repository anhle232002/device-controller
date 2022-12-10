output=$(nmcli -g name,UUID,type con)
connections=()
function getConnections
{
    counter=0
    while read line
        do
            connections[$counter]+={'"name"':'"'$(echo $line | cut -d ':' -f 1 )'"',
            connections[$counter]+='"UUID"':'"'$(echo $line | cut -d ':' -f 2 )'"',
            connections[$counter]+='"type"':'"'$(echo $line | cut -d ':' -f 3 )'"'},

            let "counter+=1"
        done <<< "$output"
}

getConnections

echo {'"connections"':[
for value in "${connections[@]}"
do
    echo $value
done
echo '""'
echo ]}