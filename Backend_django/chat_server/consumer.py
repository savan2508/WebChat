from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data):
        self.send(text_data="Hello, World!")

    def disconnect(self, close_code):
        self.channel_layer.group_discard("my_group", self.channel_name)
