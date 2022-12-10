currentSink="$(pacmd list-sinks|grep -A 15 '* index')"
echo '{ "volume": {'
echo "$currentSink" | awk '/volume: front/{ print "\"left\":"$5"," ;print "\"right\":"$12"," }' | sed 's/[%]//g'

echo "$currentSink" | awk '/balance/{print "\"balance\":"$2}'
echo "}"
echo "}"