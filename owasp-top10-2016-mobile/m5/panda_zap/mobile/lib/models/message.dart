import 'package:flutter/material.dart';

class Message {
  bool sentByMe;
  String text;
  TimeOfDay time;

  Message({
    this.sentByMe,
    this.text,
    this.time,
  });
}

List<Message> user1Messages = [
  Message(
    sentByMe: true,
    text: "Message3",
    time: TimeOfDay(hour: 14, minute: 10),
  ),
  Message(
    sentByMe: false,
    text: "Message2",
    time: TimeOfDay(hour: 15, minute: 00),
  ),
  Message(
    sentByMe: true,
    text: "Message1",
    time: TimeOfDay(hour: 15, minute: 40),
  ),
];

List<Message> user2Messages = [
  Message(
    sentByMe: true,
    text: "Message6",
    time: TimeOfDay(hour: 14, minute: 10),
  ),
  Message(
    sentByMe: false,
    text: "Message5",
    time: TimeOfDay(hour: 15, minute: 00),
  ),
  Message(
    sentByMe: true,
    text: "Message4",
    time: TimeOfDay(hour: 15, minute: 50),
  ),
];

List<Message> user3Messages = [
  Message(
    sentByMe: true,
    text: "Message9",
    time: TimeOfDay(hour: 14, minute: 10),
  ),
  Message(
    sentByMe: false,
    text: "Message8",
    time: TimeOfDay(hour: 15, minute: 10),
  ),
  Message(
    sentByMe: true,
    text: "Message7",
    time: TimeOfDay(hour: 15, minute: 40),
  ),
];

List<Message> user4Messages = [
  Message(
    sentByMe: true,
    text: "Message10",
    time: TimeOfDay(hour: 14, minute: 10),
  ),
  Message(
    sentByMe: false,
    text: "Message11",
    time: TimeOfDay(hour: 15, minute: 10),
  ),
  Message(
    sentByMe: true,
    text: "Message12",
    time: TimeOfDay(hour: 15, minute: 40),
  ),
];
