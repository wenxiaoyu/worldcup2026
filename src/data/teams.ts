export interface Team {
  id: string
  name: string
  nameEn: string
  flag: string
  founded: string
  primaryColor: string
  secondaryColor: string
  confederation: string
  group: string
  fifaRanking: number
}

export const teams: Team[] = [
  // A 组
  { id: 'mex', name: '墨西哥', nameEn: 'Mexico', flag: '🇲🇽', founded: '1927-08-23', primaryColor: '#006847', secondaryColor: '#FFFFFF', confederation: 'CONCACAF', group: 'A', fifaRanking: 14 },
  { id: 'rsa', name: '南非', nameEn: 'South Africa', flag: '🇿🇦', founded: '1991-12-08', primaryColor: '#FFB81C', secondaryColor: '#007749', confederation: 'CAF', group: 'A', fifaRanking: 60 },
  { id: 'kor', name: '韩国', nameEn: 'South Korea', flag: '🇰🇷', founded: '1928-09-22', primaryColor: '#CD2E3A', secondaryColor: '#FFFFFF', confederation: 'AFC', group: 'A', fifaRanking: 25 },
  { id: 'cze', name: '捷克', nameEn: 'Czech Republic', flag: '🇨🇿', founded: '1901-10-19', primaryColor: '#D7141A', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'A', fifaRanking: 40 },

  // B 组
  { id: 'can', name: '加拿大', nameEn: 'Canada', flag: '🇨🇦', founded: '1912-05-24', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', confederation: 'CONCACAF', group: 'B', fifaRanking: 30 },
  { id: 'bih', name: '波黑', nameEn: 'Bosnia and Herzegovina', flag: '🇧🇦', founded: '1920-06-15', primaryColor: '#002395', secondaryColor: '#F1BF00', confederation: 'UEFA', group: 'B', fifaRanking: 64 },
  { id: 'qat', name: '卡塔尔', nameEn: 'Qatar', flag: '🇶🇦', founded: '1960-03-01', primaryColor: '#8A1538', secondaryColor: '#FFFFFF', confederation: 'AFC', group: 'B', fifaRanking: 56 },
  { id: 'swi', name: '瑞士', nameEn: 'Switzerland', flag: '🇨🇭', founded: '1895-04-07', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'B', fifaRanking: 19 },

  // C 组
  { id: 'bra', name: '巴西', nameEn: 'Brazil', flag: '🇧🇷', founded: '1914-06-08', primaryColor: '#FFDF00', secondaryColor: '#009C3B', confederation: 'CONMEBOL', group: 'C', fifaRanking: 6 },
  { id: 'mar', name: '摩洛哥', nameEn: 'Morocco', flag: '🇲🇦', founded: '1955-05-02', primaryColor: '#C1272D', secondaryColor: '#006233', confederation: 'CAF', group: 'C', fifaRanking: 7 },
  { id: 'hai', name: '海地', nameEn: 'Haiti', flag: '🇭🇹', founded: '1904-05-14', primaryColor: '#00209F', secondaryColor: '#D21034', confederation: 'CONCACAF', group: 'C', fifaRanking: 83 },
  { id: 'sco', name: '苏格兰', nameEn: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', founded: '1873-03-13', primaryColor: '#003399', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'C', fifaRanking: 42 },

  // D 组
  { id: 'usa', name: '美国', nameEn: 'USA', flag: '🇺🇸', founded: '1913-04-05', primaryColor: '#002868', secondaryColor: '#BF0A30', confederation: 'CONCACAF', group: 'D', fifaRanking: 17 },
  { id: 'par', name: '巴拉圭', nameEn: 'Paraguay', flag: '🇵🇾', founded: '1906-08-25', primaryColor: '#DA121A', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', group: 'D', fifaRanking: 41 },
  { id: 'aus', name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺', founded: '1961-06-23', primaryColor: '#FFCD00', secondaryColor: '#008751', confederation: 'AFC', group: 'D', fifaRanking: 27 },
  { id: 'tur', name: '土耳其', nameEn: 'Turkey', flag: '🇹🇷', founded: '1923-04-23', primaryColor: '#E30A17', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'D', fifaRanking: 22 },

  // E 组
  { id: 'ger', name: '德国', nameEn: 'Germany', flag: '🇩🇪', founded: '1900-01-28', primaryColor: '#FFFFFF', secondaryColor: '#000000', confederation: 'UEFA', group: 'E', fifaRanking: 10 },
  { id: 'cuw', name: '库拉索', nameEn: 'Curaçao', flag: '🇨🇼', founded: '1921-03-10', primaryColor: '#002B7F', secondaryColor: '#F9E814', confederation: 'CONCACAF', group: 'E', fifaRanking: 82 },
  { id: 'civ', name: '科特迪瓦', nameEn: "Côte d'Ivoire", flag: '🇨🇮', founded: '1960-08-07', primaryColor: '#FF8200', secondaryColor: '#009E49', confederation: 'CAF', group: 'E', fifaRanking: 33 },
  { id: 'ecu', name: '厄瓜多尔', nameEn: 'Ecuador', flag: '🇪🇨', founded: '1925-05-30', primaryColor: '#FFD100', secondaryColor: '#003893', confederation: 'CONMEBOL', group: 'E', fifaRanking: 23 },

  // F 组
  { id: 'ned', name: '荷兰', nameEn: 'Netherlands', flag: '🇳🇱', founded: '1889-12-08', primaryColor: '#FF6600', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'F', fifaRanking: 8 },
  { id: 'jpn', name: '日本', nameEn: 'Japan', flag: '🇯🇵', founded: '1921-09-10', primaryColor: '#000080', secondaryColor: '#FFFFFF', confederation: 'AFC', group: 'F', fifaRanking: 18 },
  { id: 'swe', name: '瑞典', nameEn: 'Sweden', flag: '🇸🇪', founded: '1904-12-18', primaryColor: '#005BAA', secondaryColor: '#FECC00', confederation: 'UEFA', group: 'F', fifaRanking: 38 },
  { id: 'tun', name: '突尼斯', nameEn: 'Tunisia', flag: '🇹🇳', founded: '1957-03-29', primaryColor: '#E70013', secondaryColor: '#FFFFFF', confederation: 'CAF', group: 'F', fifaRanking: 45 },

  // G 组
  { id: 'bel', name: '比利时', nameEn: 'Belgium', flag: '🇧🇪', founded: '1895-09-01', primaryColor: '#ED2939', secondaryColor: '#000000', confederation: 'UEFA', group: 'G', fifaRanking: 9 },
  { id: 'egy', name: '埃及', nameEn: 'Egypt', flag: '🇪🇬', founded: '1921-12-21', primaryColor: '#CE1126', secondaryColor: '#FFFFFF', confederation: 'CAF', group: 'G', fifaRanking: 29 },
  { id: 'irn', name: '伊朗', nameEn: 'Iran', flag: '🇮🇷', founded: '1920-05-01', primaryColor: '#FFFFFF', secondaryColor: '#239F40', confederation: 'AFC', group: 'G', fifaRanking: 20 },
  { id: 'nzl', name: '新西兰', nameEn: 'New Zealand', flag: '🇳🇿', founded: '1891-03-17', primaryColor: '#FFFFFF', secondaryColor: '#000000', confederation: 'OFC', group: 'G', fifaRanking: 85 },

  // H 组
  { id: 'esp', name: '西班牙', nameEn: 'Spain', flag: '🇪🇸', founded: '1913-09-21', primaryColor: '#AA151B', secondaryColor: '#F1BF00', confederation: 'UEFA', group: 'H', fifaRanking: 2 },
  { id: 'cpv', name: '佛得角', nameEn: 'Cape Verde', flag: '🇨🇻', founded: '1982-03-18', primaryColor: '#003893', secondaryColor: '#CF2027', confederation: 'CAF', group: 'H', fifaRanking: 67 },
  { id: 'sau', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: '🇸🇦', founded: '1956-01-01', primaryColor: '#006C35', secondaryColor: '#FFFFFF', confederation: 'AFC', group: 'H', fifaRanking: 61 },
  { id: 'uru', name: '乌拉圭', nameEn: 'Uruguay', flag: '🇺🇾', founded: '1900-03-21', primaryColor: '#5CBFEB', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', group: 'H', fifaRanking: 16 },

  // I 组
  { id: 'fra', name: '法国', nameEn: 'France', flag: '🇫🇷', founded: '1919-04-07', primaryColor: '#002395', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'I', fifaRanking: 3 },
  { id: 'sen', name: '塞内加尔', nameEn: 'Senegal', flag: '🇸🇳', founded: '1960-08-20', primaryColor: '#009639', secondaryColor: '#FFFFFF', confederation: 'CAF', group: 'I', fifaRanking: 15 },
  { id: 'irq', name: '伊拉克', nameEn: 'Iraq', flag: '🇮🇶', founded: '1948-10-08', primaryColor: '#007A3D', secondaryColor: '#FFFFFF', confederation: 'AFC', group: 'I', fifaRanking: 57 },
  { id: 'nor', name: '挪威', nameEn: 'Norway', flag: '🇳🇴', founded: '1902-04-30', primaryColor: '#EF2B2D', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'I', fifaRanking: 31 },

  // J 组
  { id: 'arg', name: '阿根廷', nameEn: 'Argentina', flag: '🇦🇷', founded: '1893-02-21', primaryColor: '#75AADB', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', group: 'J', fifaRanking: 1 },
  { id: 'alg', name: '阿尔及利亚', nameEn: 'Algeria', flag: '🇩🇿', founded: '1962-07-05', primaryColor: '#006633', secondaryColor: '#FFFFFF', confederation: 'CAF', group: 'J', fifaRanking: 28 },
  { id: 'aut', name: '奥地利', nameEn: 'Austria', flag: '🇦🇹', founded: '1904-03-18', primaryColor: '#ED2939', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'J', fifaRanking: 24 },
  { id: 'jor', name: '约旦', nameEn: 'Jordan', flag: '🇯🇴', founded: '1949-04-02', primaryColor: '#007A3D', secondaryColor: '#FFFFFF', confederation: 'AFC', group: 'J', fifaRanking: 63 },

  // K 组
  { id: 'por', name: '葡萄牙', nameEn: 'Portugal', flag: '🇵🇹', founded: '1914-03-31', primaryColor: '#FF0000', secondaryColor: '#006600', confederation: 'UEFA', group: 'K', fifaRanking: 5 },
  { id: 'cod', name: '刚果(金)', nameEn: 'DR Congo', flag: '🇨🇩', founded: '1919-07-26', primaryColor: '#007FFF', secondaryColor: '#CE1021', confederation: 'CAF', group: 'K', fifaRanking: 46 },
  { id: 'uzb', name: '乌兹别克斯坦', nameEn: 'Uzbekistan', flag: '🇺🇿', founded: '1946-05-01', primaryColor: '#FFFFFF', secondaryColor: '#1EB53A', confederation: 'AFC', group: 'K', fifaRanking: 50 },
  { id: 'col', name: '哥伦比亚', nameEn: 'Colombia', flag: '🇨🇴', founded: '1924-10-27', primaryColor: '#FCD116', secondaryColor: '#003893', confederation: 'CONMEBOL', group: 'K', fifaRanking: 13 },

  // L 组
  { id: 'eng', name: '英格兰', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', founded: '1863-10-26', primaryColor: '#FFFFFF', secondaryColor: '#CF081F', confederation: 'UEFA', group: 'L', fifaRanking: 4 },
  { id: 'cro', name: '克罗地亚', nameEn: 'Croatia', flag: '🇭🇷', founded: '1912-04-13', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', confederation: 'UEFA', group: 'L', fifaRanking: 11 },
  { id: 'gha', name: '加纳', nameEn: 'Ghana', flag: '🇬🇭', founded: '1957-10-19', primaryColor: '#FFFFFF', secondaryColor: '#006B3F', confederation: 'CAF', group: 'L', fifaRanking: 73 },
  { id: 'pan', name: '巴拿马', nameEn: 'Panama', flag: '🇵🇦', founded: '1937-03-29', primaryColor: '#DA121A', secondaryColor: '#FFFFFF', confederation: 'CONCACAF', group: 'L', fifaRanking: 34 },
]

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group)
}
