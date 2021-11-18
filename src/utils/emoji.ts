const emojis =
  '🍕🍔🍟🌭🍿🧂🥓🥚🍳🧇🥞🧈🍞🥐🥨🥯🥖🫓🧀🥗🥙🥪🌮🌯🫔🥫🍖🍗🥩🍠🥟🥠🥡🍱🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🫕🍝🥣🥧🍦🍧🍨🍩🍪🎂🍰🧁🍫🍬🍭🍡🎈🎆🎇🧨🎉🎊🎃🎄🎋🎍🎎🎏🎐🎑🧧🎀🎁🎫🎠🎡🎢🎪🎭🎨🧵🪡🧶🪢🛒👓🦺🥽🥼🧥👔👕👖🩳🧣🧤🧦👗🥻👘👚🩲🩱👙👛👜👝😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😗😙🥲😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫🥱😴😌😛😜😝🤤😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨🐒🦍🦧🐩🐕🐈🐅🐆🐎🦌🦬🦏🦛🐂🐃🐄🐖🐏🐑🐐🐪🐫🦙🦘🦥🦨🦡🐘🦣🐁🐀🦔🐇🦫🦎🐊🐢🐍🐉🦕🦖🦦🦭🦈🐬🐳🐋🐟🐠🐡🦐🦑🐙🦞🦀🐚🦆🐓🦃🦅🦢🦜🦩🦚🦉🦤🐦🐧🐥🦇🦋🐌🐛🦟🪰🪱🦗🐝🪲🐞🦂';
const emojiByte = 2;

export function emojiToBase64(emoji: string): string {
  let binaryString = '';
  for (let i = 0; i < emoji.length; i += emojiByte) {
    const index = emojis.indexOf(emoji.slice(i, i + emojiByte)) / emojiByte;
    if (index < 0) throw new Error();
    binaryString += String.fromCharCode(index);
  }
  return window.btoa(binaryString);
}

export function base64ToEmoji(base64: string): string {
  const binaryString = window.atob(base64);
  let emojiString = '';
  for (let i = 0; i < binaryString.length; i += 1)
    emojiString += emojis.slice(
      binaryString.charCodeAt(i) * emojiByte,
      binaryString.charCodeAt(i) * emojiByte + emojiByte,
    );

  return emojiString;
}
