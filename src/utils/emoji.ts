const emojis =
  '🍕🍔🍟🌭🍿🧂🥓🥚🍳🧇🥞🧈🍞🥐🥨🥯🥖🍮🧀🥗🥙🥪🌮🌯🍯🥫🍖🍗🥩🍠🥟🥠🥡🍱🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🥛🍝🥣🥧🍦🍧🍨🍩🍪🎂🍰🧁🍫🍬🍭🍡🎈🎆🎇🧨🎉🎊🎃🎄🎋🎍🎎🎏🎐🎑🧧🎀🎁🎫🎠🎡🎢🎪🎭🎨🧵🎯🧶🔮🛒👓🦺🥽🥼🧥👔👕👖🩳🧣🧤🧦👗🥻👘👚🩲🩱👙👛👜👝😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😗😙🤠😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫🥱😴😌😛😜😝🤤😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨🐒🦍🦧🐩🐕🐈🐅🐆🐎🦌🦏🦛🐂🐃🐄🐖🐏🐑🐐🐪🐫🦙🦘🦥🦨🦡🐘🐁🐀🦔🐇🦎🐊🐢🐍🐉🦕🦖🦦🦈🐬🐳🐋🐟🐠🐡🦐🦑🐙🦞🦀🐚🦆🐓🦃🦅🦢🦜🦩🦚🦉🐦🐧🐥🦇🦋🐌🐛🦟🦗🐝🐞🦂🚗🚓🚕🛺🚙🚜🚌🚐';
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

export function getKeyboardEmojis(emojisPerLine: number): string[] {
  const keyBoardEmojis: string[] = [];

  emojis
    .match(new RegExp(`.{1,${emojisPerLine * 2}}`, 'g'))
    ?.map((emojiLine, index) =>
      emojiLine.split('').forEach((_, halfIndex, emojiLineArray) => {
        if (halfIndex % 2 === 0)
          keyBoardEmojis[index] = `${keyBoardEmojis[index] || ''}${
            halfIndex === 0 ? '' : ' '
          }${emojiLineArray[halfIndex]}${emojiLineArray[halfIndex + 1]}`;
      }),
    );

  keyBoardEmojis[0] += ' {bksp}';

  return keyBoardEmojis;
}
