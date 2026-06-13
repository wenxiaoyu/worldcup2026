export interface Team {
  id: string
  name: string
  nameEn: string
  flag: string
  founded: string // YYYY-MM-DD
  primaryColor: string
  secondaryColor: string
  confederation: string
  fifaRanking: number
}

export const teams: Team[] = [
  { id: 'arg', name: '阿根廷', nameEn: 'Argentina', flag: '🇦🇷', founded: '1893-02-21', primaryColor: '#75AADB', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', fifaRanking: 1 },
  { id: 'fra', name: '法国', nameEn: 'France', flag: '🇫🇷', founded: '1919-04-07', primaryColor: '#002395', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 2 },
  { id: 'eng', name: '英格兰', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', founded: '1863-10-26', primaryColor: '#FFFFFF', secondaryColor: '#CF081F', confederation: 'UEFA', fifaRanking: 3 },
  { id: 'bra', name: '巴西', nameEn: 'Brazil', flag: '🇧🇷', founded: '1914-06-08', primaryColor: '#FFDF00', secondaryColor: '#009C3B', confederation: 'CONMEBOL', fifaRanking: 4 },
  { id: 'esp', name: '西班牙', nameEn: 'Spain', flag: '🇪🇸', founded: '1913-09-21', primaryColor: '#AA151B', secondaryColor: '#F1BF00', confederation: 'UEFA', fifaRanking: 5 },
  { id: 'por', name: '葡萄牙', nameEn: 'Portugal', flag: '🇵🇹', founded: '1914-03-31', primaryColor: '#FF0000', secondaryColor: '#006600', confederation: 'UEFA', fifaRanking: 6 },
  { id: 'ned', name: '荷兰', nameEn: 'Netherlands', flag: '🇳🇱', founded: '1889-12-08', primaryColor: '#FF6600', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 7 },
  { id: 'ger', name: '德国', nameEn: 'Germany', flag: '🇩🇪', founded: '1900-01-28', primaryColor: '#FFFFFF', secondaryColor: '#000000', confederation: 'UEFA', fifaRanking: 8 },
  { id: 'ita', name: '意大利', nameEn: 'Italy', flag: '🇮🇹', founded: '1898-03-15', primaryColor: '#0066CC', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 9 },
  { id: 'uru', name: '乌拉圭', nameEn: 'Uruguay', flag: '🇺🇾', founded: '1900-03-21', primaryColor: '#5CBFEB', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', fifaRanking: 10 },
  { id: 'col', name: '哥伦比亚', nameEn: 'Colombia', flag: '🇨🇴', founded: '1924-10-27', primaryColor: '#FCD116', secondaryColor: '#003893', confederation: 'CONMEBOL', fifaRanking: 11 },
  { id: 'usa', name: '美国', nameEn: 'USA', flag: '🇺🇸', founded: '1913-04-05', primaryColor: '#002868', secondaryColor: '#BF0A30', confederation: 'CONCACAF', fifaRanking: 12 },
  { id: 'mex', name: '墨西哥', nameEn: 'Mexico', flag: '🇲🇽', founded: '1927-08-23', primaryColor: '#006847', secondaryColor: '#FFFFFF', confederation: 'CONCACAF', fifaRanking: 13 },
  { id: 'jpn', name: '日本', nameEn: 'Japan', flag: '🇯🇵', founded: '1921-09-10', primaryColor: '#000080', secondaryColor: '#FFFFFF', confederation: 'AFC', fifaRanking: 14 },
  { id: 'mar', name: '摩洛哥', nameEn: 'Morocco', flag: '🇲🇦', founded: '1955-05-02', primaryColor: '#C1272D', secondaryColor: '#006233', confederation: 'CAF', fifaRanking: 15 },
  { id: 'cro', name: '克罗地亚', nameEn: 'Croatia', flag: '🇭🇷', founded: '1912-04-13', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 16 },
  { id: 'bel', name: '比利时', nameEn: 'Belgium', flag: '🇧🇪', founded: '1895-09-01', primaryColor: '#ED2939', secondaryColor: '#000000', confederation: 'UEFA', fifaRanking: 17 },
  { id: 'den', name: '丹麦', nameEn: 'Denmark', flag: '🇩🇰', founded: '1889-05-14', primaryColor: '#C60C30', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 18 },
  { id: 'sen', name: '塞内加尔', nameEn: 'Senegal', flag: '🇸🇳', founded: '1960-08-20', primaryColor: '#009639', secondaryColor: '#FFFFFF', confederation: 'CAF', fifaRanking: 19 },
  { id: 'aus', name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺', founded: '1961-06-23', primaryColor: '#FFCD00', secondaryColor: '#008751', confederation: 'AFC', fifaRanking: 20 },
  { id: 'swi', name: '瑞士', nameEn: 'Switzerland', flag: '🇨🇭', founded: '1895-04-07', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 21 },
  { id: 'kor', name: '韩国', nameEn: 'South Korea', flag: '🇰🇷', founded: '1928-09-22', primaryColor: '#CD2E3A', secondaryColor: '#FFFFFF', confederation: 'AFC', fifaRanking: 22 },
  { id: 'can', name: '加拿大', nameEn: 'Canada', flag: '🇨🇦', founded: '1912-05-24', primaryColor: '#FF0000', secondaryColor: '#FFFFFF', confederation: 'CONCACAF', fifaRanking: 23 },
  { id: 'ecu', name: '厄瓜多尔', nameEn: 'Ecuador', flag: '🇪🇨', founded: '1925-05-30', primaryColor: '#FFD100', secondaryColor: '#003893', confederation: 'CONMEBOL', fifaRanking: 24 },
  { id: 'nga', name: '尼日利亚', nameEn: 'Nigeria', flag: '🇳🇬', founded: '1945-10-01', primaryColor: '#008751', secondaryColor: '#FFFFFF', confederation: 'CAF', fifaRanking: 25 },
  { id: 'srb', name: '塞尔维亚', nameEn: 'Serbia', flag: '🇷🇸', founded: '1919-04-13', primaryColor: '#C6363C', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 26 },
  { id: 'aut', name: '奥地利', nameEn: 'Austria', flag: '🇦🇹', founded: '1904-03-18', primaryColor: '#ED2939', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 27 },
  { id: 'tur', name: '土耳其', nameEn: 'Turkey', flag: '🇹🇷', founded: '1923-04-23', primaryColor: '#E30A17', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 28 },
  { id: 'pol', name: '波兰', nameEn: 'Poland', flag: '🇵🇱', founded: '1919-12-20', primaryColor: '#FFFFFF', secondaryColor: '#DC143C', confederation: 'UEFA', fifaRanking: 29 },
  { id: 'ukr', name: '乌克兰', nameEn: 'Ukraine', flag: '🇺🇦', founded: '1991-02-09', primaryColor: '#005BBB', secondaryColor: '#FFD500', confederation: 'UEFA', fifaRanking: 30 },
  { id: 'chn', name: '中国', nameEn: 'China', flag: '🇨🇳', founded: '1924-01-01', primaryColor: '#DE2910', secondaryColor: '#FFFFFF', confederation: 'AFC', fifaRanking: 60 },
  { id: 'qat', name: '卡塔尔', nameEn: 'Qatar', flag: '🇶🇦', founded: '1960-03-01', primaryColor: '#8A1538', secondaryColor: '#FFFFFF', confederation: 'AFC', fifaRanking: 35 },
  { id: 'irn', name: '伊朗', nameEn: 'Iran', flag: '🇮🇷', founded: '1920-05-01', primaryColor: '#FFFFFF', secondaryColor: '#239F40', confederation: 'AFC', fifaRanking: 31 },
  { id: 'gha', name: '加纳', nameEn: 'Ghana', flag: '🇬🇭', founded: '1957-10-19', primaryColor: '#FFFFFF', secondaryColor: '#006B3F', confederation: 'CAF', fifaRanking: 32 },
  { id: 'sco', name: '苏格兰', nameEn: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', founded: '1873-03-13', primaryColor: '#003399', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 33 },
  { id: 'crc', name: '哥斯达黎加', nameEn: 'Costa Rica', flag: '🇨🇷', founded: '1921-09-20', primaryColor: '#CE1126', secondaryColor: '#FFFFFF', confederation: 'CONCACAF', fifaRanking: 34 },
  { id: 'per', name: '秘鲁', nameEn: 'Peru', flag: '🇵🇪', founded: '1922-08-23', primaryColor: '#FFFFFF', secondaryColor: '#D91023', confederation: 'CONMEBOL', fifaRanking: 36 },
  { id: 'par', name: '巴拉圭', nameEn: 'Paraguay', flag: '🇵🇾', founded: '1906-08-25', primaryColor: '#DA121A', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', fifaRanking: 37 },
  { id: 'egy', name: '埃及', nameEn: 'Egypt', flag: '🇪🇬', founded: '1921-12-21', primaryColor: '#CE1126', secondaryColor: '#FFFFFF', confederation: 'CAF', fifaRanking: 38 },
  { id: 'civ', name: '科特迪瓦', nameEn: "Côte d'Ivoire", flag: '🇨🇮', founded: '1960-08-07', primaryColor: '#FF8200', secondaryColor: '#009E49', confederation: 'CAF', fifaRanking: 39 },
  { id: 'cmr', name: '喀麦隆', nameEn: 'Cameroon', flag: '🇨🇲', founded: '1959-09-11', primaryColor: '#007A5E', secondaryColor: '#CE1126', confederation: 'CAF', fifaRanking: 40 },
  { id: 'chi', name: '智利', nameEn: 'Chile', flag: '🇨🇱', founded: '1895-06-19', primaryColor: '#D52B1E', secondaryColor: '#FFFFFF', confederation: 'CONMEBOL', fifaRanking: 41 },
  { id: 'wal', name: '威尔士', nameEn: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', founded: '1876-02-02', primaryColor: '#D4213D', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 42 },
  { id: 'nor', name: '挪威', nameEn: 'Norway', flag: '🇳🇴', founded: '1902-04-30', primaryColor: '#EF2B2D', secondaryColor: '#FFFFFF', confederation: 'UEFA', fifaRanking: 43 },
  { id: 'swe', name: '瑞典', nameEn: 'Sweden', flag: '🇸🇪', founded: '1904-12-18', primaryColor: '#005BAA', secondaryColor: '#FECC00', confederation: 'UEFA', fifaRanking: 44 },
  { id: 'jam', name: '牙买加', nameEn: 'Jamaica', flag: '🇯🇲', founded: '1910-07-14', primaryColor: '#009B3A', secondaryColor: '#FED100', confederation: 'CONCACAF', fifaRanking: 45 },
  { id: 'sau', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: '🇸🇦', founded: '1956-01-01', primaryColor: '#006C35', secondaryColor: '#FFFFFF', confederation: 'AFC', fifaRanking: 46 },
  { id: 'nzl', name: '新西兰', nameEn: 'New Zealand', flag: '🇳🇿', founded: '1891-03-17', primaryColor: '#FFFFFF', secondaryColor: '#000000', confederation: 'OFC', fifaRanking: 47 },
]
