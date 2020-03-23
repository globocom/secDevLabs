class SessionToken {
  String Value;

  SessionToken(this.Value);

  SessionToken.fromJson(Map<String, dynamic> json)
      : Value = json['sessionToken'];

  Map<String, dynamic> toJson() => {
        'sessionToken': Value,
      };
}
