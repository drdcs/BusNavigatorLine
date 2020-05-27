from pykafka import KafkaClient
from datetime import datetime
import json, time, uuid

# read coordinates

input_file = open('data/bus1.json')
json_array = json.load(input_file)
coordinates = json_array['features'][0]['geometry']['coordinates']

# generate uuid

def generate_uuid():
    return uuid.uuid4()

def get_Kafka_Cluent():
    return KafkaClient(hosts='localhost:9092')

# Kafka Producer:

client = get_Kafka_Cluent()
topic = client.topics['busline']
producer = topic.get_sync_producer()

# Construct message

data = {}
data['busline'] = '00001'

def generate_checkpoint(coordinates):
    i = 0
    while i < len(coordinates):
        data['key'] = data['busline'] + str(generate_uuid())
        data['timestamp'] = str(datetime.utcnow())
        data['latitude'] = coordinates[i][1]
        data['longitude'] = coordinates[i][0]
        message = json.dumps(data)
        print(message)
        producer.produce(message.encode('ascii'))
        time.sleep(1)

        # if bus reaches end then start from beginning
        if i == len(coordinates)-1:
            i = 0
        else:
             i += 1

if __name__ == '__main__':
    generate_checkpoint(coordinates)



