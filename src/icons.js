// Иконки Phosphor Icons (MIT, https://phosphoricons.com), стиль duotone.
// Подключаем только нужные — в сборку попадают только они.

import balloon from '@phosphor-icons/core/assets/duotone/balloon-duotone.svg?raw'
import bank from '@phosphor-icons/core/assets/duotone/bank-duotone.svg?raw'
import cassetteTape from '@phosphor-icons/core/assets/duotone/cassette-tape-duotone.svg?raw'
import castleTurret from '@phosphor-icons/core/assets/duotone/castle-turret-duotone.svg?raw'
import cat from '@phosphor-icons/core/assets/duotone/cat-duotone.svg?raw'
import confetti from '@phosphor-icons/core/assets/duotone/confetti-duotone.svg?raw'
import crown from '@phosphor-icons/core/assets/duotone/crown-duotone.svg?raw'
import cube from '@phosphor-icons/core/assets/duotone/cube-duotone.svg?raw'
import deviceMobile from '@phosphor-icons/core/assets/duotone/device-mobile-duotone.svg?raw'
import discoBall from '@phosphor-icons/core/assets/duotone/disco-ball-duotone.svg?raw'
import doorOpen from '@phosphor-icons/core/assets/duotone/door-open-duotone.svg?raw'
import eye from '@phosphor-icons/core/assets/duotone/eye-duotone.svg?raw'
import fire from '@phosphor-icons/core/assets/duotone/fire-duotone.svg?raw'
import flyingSaucer from '@phosphor-icons/core/assets/duotone/flying-saucer-duotone.svg?raw'
import gameController from '@phosphor-icons/core/assets/duotone/game-controller-duotone.svg?raw'
import ghost from '@phosphor-icons/core/assets/duotone/ghost-duotone.svg?raw'
import iceCream from '@phosphor-icons/core/assets/duotone/ice-cream-duotone.svg?raw'
import lightning from '@phosphor-icons/core/assets/duotone/lightning-duotone.svg?raw'
import listNumbers from '@phosphor-icons/core/assets/duotone/list-numbers-duotone.svg?raw'
import lockKey from '@phosphor-icons/core/assets/duotone/lock-key-duotone.svg?raw'
import maskHappy from '@phosphor-icons/core/assets/duotone/mask-happy-duotone.svg?raw'
import microphoneStage from '@phosphor-icons/core/assets/duotone/microphone-stage-duotone.svg?raw'
import pawPrint from '@phosphor-icons/core/assets/duotone/paw-print-duotone.svg?raw'
import personSimpleTaiChi from '@phosphor-icons/core/assets/duotone/person-simple-tai-chi-duotone.svg?raw'
import shootingStar from '@phosphor-icons/core/assets/duotone/shooting-star-duotone.svg?raw'
import smileyWink from '@phosphor-icons/core/assets/duotone/smiley-wink-duotone.svg?raw'
import star from '@phosphor-icons/core/assets/duotone/star-duotone.svg?raw'

export const icons = {
  'balloon': balloon,
  'bank': bank,
  'cassette-tape': cassetteTape,
  'castle-turret': castleTurret,
  'cat': cat,
  'confetti': confetti,
  'crown': crown,
  'cube': cube,
  'device-mobile': deviceMobile,
  'disco-ball': discoBall,
  'door-open': doorOpen,
  'eye': eye,
  'fire': fire,
  'flying-saucer': flyingSaucer,
  'game-controller': gameController,
  'ghost': ghost,
  'ice-cream': iceCream,
  'lightning': lightning,
  'list-numbers': listNumbers,
  'lock-key': lockKey,
  'mask-happy': maskHappy,
  'microphone-stage': microphoneStage,
  'paw-print': pawPrint,
  'person-simple-tai-chi': personSimpleTaiChi,
  'shooting-star': shootingStar,
  'smiley-wink': smileyWink,
  'star': star,
}

// SVG-строка иконки с классом (размер и цвет задаются в CSS через currentColor)
export const icon = (name, cls = 'icon') => (icons[name] || '').replace('<svg ', `<svg class="${cls}" aria-hidden="true" `)
