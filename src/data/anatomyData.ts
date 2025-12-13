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
    image: '/anatomy/images/foot.svg',
    labels: [
      { id: 'heel', text: 'עקב', x: 20, y: 80 },
      { id: 'sole', text: 'כף הרגל', x: 40, y: 60 },
      { id: 'ball', text: 'כדור הרגל', x: 40, y: 40 },
      { id: 'bigtoe', text: 'אצבע גדולה', x: 30, y: 15 },
      { id: 'toes', text: 'אצבעות', x: 50, y: 20 },
      { id: 'arch', text: 'קשת הרגל', x: 25, y: 50 }
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
    image: '/anatomy/images/back-muscles.svg',
    labels: [
      { id: 'trapezius', text: 'שריר טרפז', x: 50, y: 25 },
      { id: 'latissimus', text: 'שריר רחב הגב', x: 50, y: 50 },
      { id: 'rhomboid', text: 'שריר מעוין', x: 40, y: 35 },
      { id: 'erector', text: 'שרירי הזקום', x: 50, y: 55 },
      { id: 'serratus', text: 'שריר מסור', x: 65, y: 45 }
    ]
  },
  {
    id: 'chestMuscles',
    name: 'Chest Muscles',
    hebName: 'שרירי החזה',
    description: 'The chest muscles support breathing and arm movement.',
    image: '/anatomy/images/chest-muscles.svg',
    labels: [
      { id: 'pectoralis', text: 'שריר חזה גדול', x: 45, y: 40 },
      { id: 'intercostal', text: 'שרירים בין-צלעיים', x: 50, y: 50 },
      { id: 'serratus2', text: 'שריר מסור קדמי', x: 60, y: 45 },
      { id: 'subclavius', text: 'שריר תחת קולר', x: 50, y: 25 }
    ]
  }
];

export const getAnatomyItemById = (id: string): AnatomyItem | undefined => {
  return anatomyItems.find(item => item.id === id);
};
