class Message {
  bool sentByMe;
  String text;
  String date;

  Message({
    this.sentByMe,
    this.text,
    this.date,
  });
}

List<Message> user1Messages = [
  Message(
    sentByMe: true,
    text: "Message3",
    date: "14:10",
  ),
  Message(
    sentByMe: false,
    text: "Message2",
    date: "15:00",
  ),
  Message(
    sentByMe: true,
    text: "Message1",
    date: "15:40",
  ),
];

List<Message> user2Messages = [
  Message(
    sentByMe: true,
    text: "Message6",
    date: "14:10",
  ),
  Message(
    sentByMe: false,
    text: "Message5",
    date: "15:00",
  ),
  Message(
    sentByMe: true,
    text: "Message4",
    date: "15:40",
  ),
];

List<Message> user3Messages = [
  Message(
    sentByMe: true,
    text: "Message9",
    date: "14:10",
  ),
  Message(
    sentByMe: false,
    text: "Message8",
    date: "15:00",
  ),
  Message(
    sentByMe: true,
    text: "Message7",
    date: "15:40",
  ),
];
