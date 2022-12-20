currentInputSource="$(pacmd list-sources|grep -A 80 '* index'  )"

index="$(echo "$currentInputSource" | grep 'index' | cut -d ":" -f 2)"
product_name="$(echo "$currentInputSource" | grep 'device.product.name' | cut -d "=" -f 2)"
ports_text="$(echo "$currentInputSource" | grep -A 20 'ports' |  sed '/properties\|ports\|active port/d' | xargs )"
ports=()
#| grep 'volume: front-left' | cut -d "/" -f 2 | sed 's/[%]//g'  
while read line
    do 
        port_name="$(echo "$line" | cut -d ":" -f 1)"
        port_description="$(echo "$line" | cut -d ":" -f 2 | cut -d "(" -f 1 | xargs)"
        ports+=("{\"name\":\"$port_name\" , \"description\" : \"$port_description\" }")
done <<< "$ports_text"


echo "{\"index\" : "$index" , \"productName\" : $product_name  ,  "
echo "\"ports\" : ["
for value in "${ports[@]}"
do
    echo $value,
done

echo "{}]}"

