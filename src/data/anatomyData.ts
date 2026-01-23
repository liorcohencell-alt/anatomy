export interface AnatomyItem {
  id: string;
  name: string;
  hebName: string;
  description: string;
  image: string; // Placeholder image path
  labels: {
    id: string;
    text: string;
    x: number;
    y: number;
  }[];
}

export const anatomyItems: AnatomyItem[] = [
  {
    id: 'hand',
    name: 'Hand',
    hebName: 'כף יד',
    description: 'The hand is a part of the body consisting of the palm, fingers and thumb.',
    image: '/anatomy/images/handClear.jpg',
    labels: [
      { id: 'distalPhalanx', text: 'Distal Phalanx', x: 70, y: 12 },
      { id: 'dipJoint', text: 'DIP Joint', x: 81, y: 18 },
      { id: 'middlePhalanx', text: 'Middle Phalanx', x: 71, y: 23 },
      { id: 'pipJoint', text: 'PIP Joint', x: 80, y: 29 },
      { id: 'proximalPhalanx', text: 'Proximal Phalanx', x: 70, y: 34 },
      { id: 'metacarpals', text: 'Metacarpals', x: 79, y: 74 },
      { id: 'carpals', text: 'Carpals', x: 72, y: 80 },
      { id: 'hamate', text: 'Hamate', x: 16, y: 71 },
      { id: 'capitate', text: 'Capitate', x: 20, y: 76 },
      { id: 'pisiform', text: 'Pisiform', x: 20, y: 81 },
      { id: 'triquetrum', text: 'Triquetrum', x: 25, y: 84 },
      { id: 'scaphoid', text: 'Scaphoid', x: 70, y: 89 },
      { id: 'lunate', text: 'Lunate', x: 65, y: 94 },
      { id: 'ulna', text: 'Ulna', x: 34, y: 97 },
      { id: 'radius', text: 'Radius', x: 49, y: 97 }
    ]
  },
  {
    id: 'foot',
    name: 'Foot',
    hebName: 'כף רגל',
    description: 'The foot is the lowest extremity of the leg on which an animal stands when moving about.',
    image: '/anatomy/images/footclear.jpg',
    labels: [
      { id: 'hallux', text: 'Hallux', x: 25, y: 15 },
      { id: 'phalanges', text: 'Phalanges', x: 40, y: 20 },
      { id: 'distal', text: 'Distal', x: 50, y: 25 },
      { id: 'middle', text: 'Middle', x: 50, y: 35 },
      { id: 'proximal', text: 'Proximal', x: 50, y: 45 },
      { id: 'metatarsals', text: 'Metatarsals', x: 45, y: 55 },
      { id: 'tarsals', text: 'Tarsals', x: 40, y: 65 },
      { id: 'medialCuneiform', text: 'Medial cuneiform', x: 30, y: 70 },
      { id: 'intermediateCuneiform', text: 'Intermediate cuneiform', x: 40, y: 70 },
      { id: 'navicular', text: 'Navicular', x: 50, y: 70 },
      { id: 'lateralCuneiform', text: 'Lateral cuneiform', x: 60, y: 70 },
      { id: 'cuboid', text: 'Cuboid', x: 65, y: 65 },
      { id: 'talus', text: 'Talus', x: 50, y: 80 },
      { id: 'calcaneus', text: 'Calcaneus', x: 30, y: 85 }
    ]
  },
  {
    id: 'ribs',
    name: 'Ribs',
    hebName: 'צלעות',
    description: 'The ribs are long curved bones that form the rib cage.',
    image: '/anatomy/images/ribs.svg',
    labels: [
      { id: 'rib1', text: 'צלע ראשונה', x: 50, y: 20 },
      { id: 'rib2', text: 'צלע שנייה', x: 50, y: 30 },
      { id: 'rib3', text: 'צלע שלישית', x: 50, y: 40 },
      { id: 'rib4', text: 'צלע רביעית', x: 50, y: 50 },
      { id: 'rib5', text: 'צלע חמישית', x: 50, y: 60 },
      { id: 'sternum', text: 'עצם החזה', x: 20, y: 40 },
      { id: 'spine', text: 'עמוד שדרה', x: 80, y: 40 }
    ]
  },
  {
    id: 'spine',
    name: 'Spine',
    hebName: 'עמוד השדרה',
    description: 'The spine is a series of bones called vertebrae that are connected by ligaments and muscles.',
    image: '/anatomy/images/spine.svg',
    labels: [
      { id: 'cervical', text: 'שדרות צוואריות', x: 50, y: 15 },
      { id: 'thoracic', text: 'שדרות חזה', x: 50, y: 35 },
      { id: 'lumbar', text: 'שדרות מותן', x: 50, y: 55 },
      { id: 'sacrum', text: 'עצם הקודש', x: 50, y: 75 },
      { id: 'coccyx', text: 'עצם הזנב', x: 50, y: 85 }
    ]
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    hebName: 'אגן',
    description: 'The pelvis is a basin-shaped structure made up of bones and joints that connect the spine to the legs.',
    image: '/anatomy/images/pelvis.svg',
    labels: [
      { id: 'ilium', text: 'כנף האגן', x: 35, y: 30 },
      { id: 'pubis', text: 'עצם ההציע', x: 50, y: 60 },
      { id: 'ischium', text: 'עצם המושב', x: 50, y: 70 },
      { id: 'sacroiliac', text: 'מפרק ישן-כנפי', x: 50, y: 20 },
      { id: 'acetabulum', text: 'כוס ירך', x: 50, y: 50 }
    ]
  },
  {
    id: 'shoulder',
    name: 'Shoulder',
    hebName: 'שכמה',
    description: 'The shoulder is the joint between the arm and the torso.',
    image: '/anatomy/images/shoulder.svg',
    labels: [
      { id: 'clavicle', text: 'עצם קולר', x: 40, y: 25 },
      { id: 'scapula', text: 'עצם השכמה', x: 55, y: 40 },
      { id: 'humerus', text: 'עצם הזרוע', x: 50, y: 60 },
      { id: 'rotator', text: 'שרירי הרוטטור', x: 50, y: 45 },
      { id: 'biceps', text: 'שריר דו-ראשי', x: 35, y: 55 }
    ]
  },
  {
    id: 'backMuscles',
    name: 'Back Muscles',
    hebName: 'שרירי הגב',
    description: 'The back muscles provide support, movement, and stability to the upper body.',
    image: '/anatomy/images/backMuscles.jpg',
    labels: [
      { id: 'trapezius', text: 'Trapezius', x: 7, y: 43 },
      { id: 'latissimus', text: 'Latissimus dorsi', x: 37, y: 56 },
      { id: 'rhomboid', text: 'Rhomboids (minor+major)', x: 36, y: 47 },
      { id: 'erector', text: 'Erector spine', x: 70, y: 49 },
      { id: 'quadratus', text: 'Quadratus lumborum', x: 93, y: 61 }
    ]
  },
  {
    id: 'chestMuscles',
    name: 'Chest Muscles',
    hebName: 'שרירי החזה',
    description: 'The chest muscles support breathing and arm movement.',
    image: '/anatomy/images/chestMuscles.jpg',
    labels: [
      { id: 'pectoralis', text: 'Pectoralis major', x: 45, y: 40 },
      { id: 'serratus', text: 'Serratus anterior', x: 60, y: 45 }
    ]
  },
  {
    id: 'abdominalMuscles',
    name: 'Abdominal Muscles',
    hebName: 'שרירי הבטן',
    description: 'The abdominal muscles support the trunk and help with movement and breathing.',
    image: '/anatomy/images/abdominal-muscles.svg',
    labels: [
      { id: 'rectus', text: 'Rectus Abdominis', x: 50, y: 40 },
      { id: 'externalOblique', text: 'Abdominal External Oblique', x: 45, y: 35 },
      { id: 'internalOblique', text: 'Abdominal Internal Oblique', x: 45, y: 38 },
      { id: 'transverse', text: 'Transverse Abdominal', x: 50, y: 50 }
    ]
  },
  {
    id: 'shoulderMuscles',
    name: 'Shoulder Muscles',
    hebName: 'שרירי כתף',
    description: 'The shoulder muscles provide movement and stability to the shoulder joint.',
    image: '/anatomy/images/shoulder-muscles.svg',
    labels: [
      { id: 'deltoid', text: 'Deltoid', x: 50, y: 30 },
      { id: 'supraspinatus', text: 'Supraspinatus', x: 45, y: 25 },
      { id: 'infraspinatus', text: 'Infraspinatus', x: 55, y: 35 },
      { id: 'teresMinor', text: 'Teres Minor', x: 60, y: 32 }
    ]
  },
  {
    id: 'armMuscles',
    name: 'Arm Muscles',
    hebName: 'שרירי הזרוע',
    description: 'The arm muscles enable flexion and extension of the arm.',
    image: '/anatomy/images/arm-muscles.svg',
    labels: [
      { id: 'biceps', text: 'Biceps Brachi', x: 45, y: 40 },
      { id: 'brachialis', text: 'Brachialis', x: 50, y: 45 },
      { id: 'triceps', text: 'Triceps', x: 55, y: 40 }
    ]
  },
  {
    id: 'forearmPosteriorMuscles',
    name: 'Posterior Forearm Muscles',
    hebName: 'שרירי האמה מדור פוסטריורי',
    description: 'The posterior forearm muscles extend the wrist and fingers.',
    image: '/anatomy/images/forearm-posterior-muscles.svg',
    labels: [
      { id: 'extensorCarpiRadialis', text: 'Extensor carpi radialis (longus + brevis)', x: 50, y: 35 },
      { id: 'extensorDigitorumCommunis', text: 'Extensor digitorum communis', x: 50, y: 40 },
      { id: 'extensorCarpiUlnaris', text: 'Extensor carpi ulnaris', x: 50, y: 45 }
    ]
  },
  {
    id: 'forearmAnteriorMuscles',
    name: 'Anterior Forearm Muscles',
    hebName: 'שרירי האמה מדור אנטריורי',
    description: 'The anterior forearm muscles flex the wrist and fingers.',
    image: '/anatomy/images/forearm-anterior-muscles.svg',
    labels: [
      { id: 'brachioRadialis', text: 'Brachio radialis', x: 50, y: 30 },
      { id: 'flexorCarpiRadialis', text: 'Flexor carpi radialis', x: 45, y: 40 },
      { id: 'palmaris', text: 'Palmaris longus', x: 50, y: 42 },
      { id: 'flexorCarpiUlnaris', text: 'Flexor carpi ulnaris', x: 55, y: 40 },
      { id: 'flexorDigitorumSuperficialis', text: 'Flexor digitorum superficialis', x: 50, y: 48 },
      { id: 'flexorDigitorumProfundus', text: 'Flexor digitorum profundus', x: 50, y: 52 }
    ]
  },
  {
    id: 'thenarMuscles',
    name: 'Thumb Muscles',
    hebName: 'שרירים מניעי אגודל',
    description: 'The thumb muscles enable movement and opposition of the thumb.',
    image: '/anatomy/images/thenar-muscles.svg',
    labels: [
      { id: 'extensorPollicisLongus', text: 'Extensor pollicis longus', x: 50, y: 35 },
      { id: 'extensorPollicisBrevis', text: 'Extensor pollicis brevis', x: 50, y: 40 },
      { id: 'abductorPollicisLongus', text: 'Abductor pollicis longus', x: 50, y: 45 }
    ]
  },
  {
    id: 'pelvisMuscles',
    name: 'Pelvic Muscles',
    hebName: 'שרירי האגן',
    description: 'The pelvic muscles support pelvic organs and enable movement.',
    image: '/anatomy/images/pelvic-muscles.svg',
    labels: [
      { id: 'gluteusMaximus', text: 'Gluteus maximus', x: 50, y: 35 },
      { id: 'gluteusMedius', text: 'Gluteus medius', x: 50, y: 40 },
      { id: 'iliopsoas', text: 'Iliopsoas', x: 50, y: 45 },
      { id: 'tensorFascia', text: 'Tensor fascia lata', x: 50, y: 50 }
    ]
  },
  {
    id: 'anteriorThighMuscles',
    name: 'Anterior Thigh Muscles',
    hebName: 'שרירי ירך אנטריורי',
    description: 'The anterior thigh muscles extend the knee and flex the hip.',
    image: '/anatomy/images/anterior-thigh-muscles.svg',
    labels: [
      { id: 'sartorius', text: 'Sartorius', x: 45, y: 35 },
      { id: 'rectusFemoris', text: 'Rectus femoris', x: 50, y: 40 }
    ]
  },
  {
    id: 'medialThighMuscles',
    name: 'Medial Thigh Muscles',
    hebName: 'שרירי ירך מדיאלי',
    description: 'The medial thigh muscles adduct the hip.',
    image: '/anatomy/images/medial-thigh-muscles.svg',
    labels: [
      { id: 'gracilis', text: 'Gracilis', x: 48, y: 40 },
      { id: 'adductorMagnus', text: 'Adductor magnus', x: 50, y: 45 }
    ]
  },
  {
    id: 'posteriorThighMuscles',
    name: 'Posterior Thigh Muscles',
    hebName: 'שרירי ירך פוסטריורי',
    description: 'The posterior thigh muscles flex the knee and extend the hip.',
    image: '/anatomy/images/posterior-thigh-muscles.svg',
    labels: [
      { id: 'bicepsFemoris', text: 'Biceps femoris', x: 50, y: 35 },
      { id: 'semitendinosus', text: 'Semitendinosus', x: 50, y: 40 },
      { id: 'semimembranosus', text: 'Semimembranosus', x: 50, y: 45 }
    ]
  },
  {
    id: 'anteriorLegMuscles',
    name: 'Anterior Leg Muscles',
    hebName: 'שרירי שוק אנטריורי',
    description: 'The anterior leg muscles dorsiflex the ankle and extend the toes.',
    image: '/anatomy/images/anterior-leg-muscles.svg',
    labels: [
      { id: 'tibialisAnterior', text: 'Tibialis anterior', x: 50, y: 35 },
      { id: 'extensorHallucisLongus', text: 'Extensor hallucis longus', x: 45, y: 40 },
      { id: 'extensorDigitorumLongus', text: 'Extensor Digitorum Longus', x: 50, y: 45 }
    ]
  },
  {
    id: 'lateralLegMuscles',
    name: 'Lateral Leg Muscles',
    hebName: 'שרירי השוק לטרלי',
    description: 'The lateral leg muscles evert the ankle.',
    image: '/anatomy/images/lateral-leg-muscles.svg',
    labels: [
      { id: 'fibularisLongus', text: 'Fibularis longus', x: 50, y: 40 },
      { id: 'fibularisBrevis', text: 'Fibularis brevis', x: 50, y: 45 }
    ]
  },
  {
    id: 'posteriorLegMuscles',
    name: 'Posterior Leg Muscles',
    hebName: 'שרירי שוק פוסטריורי',
    description: 'The posterior leg muscles plantar flex the ankle.',
    image: '/anatomy/images/posterior-leg-muscles.svg',
    labels: [
      { id: 'gastrocnemius', text: 'Gastrocnemius', x: 50, y: 35 },
      { id: 'soleus', text: 'Soleus', x: 50, y: 40 },
      { id: 'tibialisPosterior', text: 'Tibialis Posterior', x: 50, y: 45 }
    ]
  },
  {
    id: 'neckMuscles',
    name: 'Neck Muscles',
    hebName: 'שרירי צוואר',
    description: 'The neck muscles support the head and enable neck movement.',
    image: '/anatomy/images/neck-muscles.svg',
    labels: [
      { id: 'sternocleidomastoid', text: 'Sterno cleido mastoid', x: 50, y: 40 }
    ]
  },
  {
    id: 'neckBackMuscles',
    name: 'Back Neck Muscles',
    hebName: 'שרירי העורף',
    description: 'The back neck muscles support the head and enable neck extension.',
    image: '/anatomy/images/neck-back-muscles.svg',
    labels: [
      { id: 'spleniiCapitis', text: 'splenius capitis', x: 50, y: 35 },
      { id: 'semispinalisCapitis', text: 'Semispinalis capitis', x: 50, y: 40 },
      { id: 'rectusCapitis', text: 'Rectus capitis', x: 50, y: 45 }
    ]
  },
  {
    id: 'positions',
    name: 'Positions',
    hebName: 'תנוחות',
    description: 'Anatomical positions used to describe the location and orientation of body parts.',
    image: '/anatomy/images/positionsClear.jpg',
    labels: [
      { id: 'superior', text: 'Superior, Cranial', x: 62, y: 5 },
      { id: 'inferior', text: 'Inferior, Caudal', x: 37, y: 90 },
      { id: 'ventral', text: 'Ventral, Anterior', x: 18, y: 32 },
      { id: 'posterior', text: 'Posterior, Dorsal', x: 80, y: 18 },
      { id: 'medial', text: 'Medial', x: 31, y: 42 },
      { id: 'lateral', text: 'Lateral', x: 35, y: 48 },
      { id: 'proximal', text: 'Proximal', x: 74, y: 31 },
      { id: 'distal', text: 'Distal', x: 73, y: 51 }
    ]
  }
];

export const getAnatomyItemById = (id: string): AnatomyItem | undefined => {
  return anatomyItems.find(item => item.id === id);
};
