export interface TarotCard {
  id: number
  name: string
  nameEn: string
  upright: string
  reversed: string
  element: string
  score: number // base influence score 1-10
}

export const majorArcana: TarotCard[] = [
  { id: 0, name: '愚者', nameEn: 'The Fool', upright: '新的开始、冒险精神、无限可能', reversed: '鲁莽、犹豫不决、方向迷失', element: '风', score: 5 },
  { id: 1, name: '魔术师', nameEn: 'The Magician', upright: '创造力、技巧精湛、掌控全局', reversed: '欺骗、技术失误、能力不足', element: '火', score: 8 },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', upright: '直觉、神秘力量、隐藏实力', reversed: '秘密暴露、判断失误', element: '水', score: 6 },
  { id: 3, name: '女皇', nameEn: 'The Empress', upright: '丰收、繁荣昌盛、团队和谐', reversed: '内部矛盾、创造力匮乏', element: '土', score: 7 },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', upright: '权威、领导力、纪律严明', reversed: '独裁、僵化、控制过度', element: '火', score: 9 },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', upright: '传统、信仰、精神导师', reversed: '叛逆、打破常规', element: '土', score: 6 },
  { id: 6, name: '恋人', nameEn: 'The Lovers', upright: '完美配合、默契十足、和谐', reversed: '分歧、选择困难、失衡', element: '风', score: 7 },
  { id: 7, name: '战车', nameEn: 'The Chariot', upright: '胜利、意志坚定、势不可挡', reversed: '失控、方向偏离、内耗', element: '水', score: 10 },
  { id: 8, name: '力量', nameEn: 'Strength', upright: '勇气、内在力量、韧性十足', reversed: '自我怀疑、体力不支', element: '火', score: 9 },
  { id: 9, name: '隐士', nameEn: 'The Hermit', upright: '深思熟虑、战术大师、独行侠', reversed: '孤立、过度保守', element: '土', score: 5 },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', upright: '命运转折、运气爆棚、天选之子', reversed: '厄运降临、逆境连连', element: '火', score: 8 },
  { id: 11, name: '正义', nameEn: 'Justice', upright: '公平竞争、因果报应、平衡', reversed: '不公、偏见、争议判罚', element: '风', score: 6 },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', upright: '牺牲、等待时机、以退为进', reversed: '无谓牺牲、停滞不前', element: '水', score: 4 },
  { id: 13, name: '死神', nameEn: 'Death', upright: '终结与重生、脱胎换骨', reversed: '抗拒改变、苟延残喘', element: '水', score: 7 },
  { id: 14, name: '节制', nameEn: 'Temperance', upright: '平衡、耐心、稳扎稳打', reversed: '极端、失衡、急躁冒进', element: '火', score: 6 },
  { id: 15, name: '恶魔', nameEn: 'The Devil', upright: '欲望驱动、爆发力、暗黑能量', reversed: '束缚、沉迷、自我毁灭', element: '土', score: 8 },
  { id: 16, name: '塔', nameEn: 'The Tower', upright: '颠覆、爆冷门、翻天覆地', reversed: '避开灾难、虚惊一场', element: '火', score: 3 },
  { id: 17, name: '星星', nameEn: 'The Star', upright: '希望、灵感、天赋异禀', reversed: '失望、缺乏信心', element: '风', score: 8 },
  { id: 18, name: '月亮', nameEn: 'The Moon', upright: '迷惑、变数、不可预知', reversed: '真相大白、迷雾散去', element: '水', score: 4 },
  { id: 19, name: '太阳', nameEn: 'The Sun', upright: '荣耀、胜利、光芒万丈', reversed: '短暂辉煌、昙花一现', element: '火', score: 10 },
  { id: 20, name: '审判', nameEn: 'Judgement', upright: '觉醒、复活、绝地反击', reversed: '自我否定、错失良机', element: '火', score: 7 },
  { id: 21, name: '世界', nameEn: 'The World', upright: '圆满、冠军之相、功成名就', reversed: '半途而废、功亏一篑', element: '土', score: 10 },
]
