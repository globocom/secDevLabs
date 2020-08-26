class CaesarCypher {
  int key;

  CaesarCypher({
    this.key,
  });

  String encrypt(String rawMessage) {
    String encryptedMessage;
    String _tmpMessage = "";

    for (int i = 0; i < rawMessage.length; i++) {
      int char = rawMessage.codeUnitAt(i);
      int offSet;
      String h;
      if (char >= 'a'.codeUnitAt(0) && char <= 'z'.codeUnitAt(0)) {
        offSet = 97;
      } else if (char >= 'A'.codeUnitAt(0) && char <= 'Z'.codeUnitAt(0)) {
        offSet = 65;
      } else if (char == ' '.codeUnitAt(0)) {
        _tmpMessage += " ";
        continue;
      } else {
        //Invalid Message
        _tmpMessage = "";
        break;
      }

      int c;
      c = (char + key - offSet) % 26;
      h = String.fromCharCode(c + offSet);
      _tmpMessage += h;
    }
    encryptedMessage = _tmpMessage;
    return encryptedMessage;
  }

  String decrypt(String encryptedMessage) {
    String decryptedMessage;
    String _tmpMessage = "";

    for (int i = 0; i < encryptedMessage.length; i++) {
      int char = encryptedMessage.codeUnitAt(i);
      int offSet;
      String h;
      if (char >= 'a'.codeUnitAt(0) && char <= 'z'.codeUnitAt(0)) {
        offSet = 97;
      } else if (char >= 'A'.codeUnitAt(0) && char <= 'Z'.codeUnitAt(0)) {
        offSet = 65;
      } else if (char == ' '.codeUnitAt(0)) {
        _tmpMessage += " ";
        continue;
      } else {
        //Invalid Message
        _tmpMessage = "";
        break;
      }

      int c;
      c = (char - this.key - offSet) % 26;
      h = String.fromCharCode(c + offSet);
      _tmpMessage += h;
    }
    decryptedMessage = _tmpMessage;
    return decryptedMessage;
  }
}
