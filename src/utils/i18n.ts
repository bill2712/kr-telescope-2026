export const translations = {
  'zh-HK': {
    appTitle: 'Kidrise 星空探索者',
    homeTitle: 'Kidrise 望遠鏡探秘',
    homeSlogan: '開啟你的科學探索之旅！',
    homeExperience: {
      prompt: '今日想做甚麼？揀一個任務，我哋會帶你完成。',
      beginner: '初階模式',
      advanced: '進階模式',
      beginnerDesc: '保留星圖、今晚建議及使用教學，適合第一次使用。',
      advancedDesc: '顯示完整天文知識、測驗及進階工具。',
      replayGuide: '重播首次教學',
      tasks: {
        map: { title: '開啟實時星圖', desc: '查看此刻香港夜空及星座方向。', action: '打開星圖' },
        tonight: { title: '今晚睇咩', desc: '按天氣、月相及季節揀容易觀察嘅目標。', action: '查看建議' },
        resume: { title: '繼續上次探索', desc: '返回你最近使用的「{page}」。', empty: '完成第一個任務後，可以由這裡快速返回。', action: '繼續' },
      },
    },
    subtitle: '小小天文學家的實時星圖',
    visitShop: '參觀商店',
    locationTitle: '觀測地點',
    myGps: '我的位置',
    hkDef: '香港 (預設)',
    viewingFrom: '目前觀測位置：',
    gpsLocation: 'GPS 定位',
    hongKong: '香港',
    timeTravel: '時光機',
    now: '現在',
    viewMode: '觀看模式',
    wideSky: '廣角星空',
    globe3d: '3D 星球',
    chatPlaceholder: '問問關於星星的問題...',
    chatThinking: '思考中...',
    chatError: '訊號干擾中！請再試一次。',
    chatTitle: '星空嚮導',
    chatSubtitle: '由 Gemini AI 驅動',
    tutorial: {
      welcomeTitle: '歡迎來到 Kidrise 星空探險號！',
      welcomeDesc: '我是你的 AI 副機長。準備好一起探索宇宙了嗎？',
      
      step1Title: '到處看看 (Look Around)',
      step1Desc: '用手指拖動來飛翔！雙指開合可以飛近或飛遠星星。★ 點擊任何一顆星星，就可以鎖定它並查看詳細資料喔！',
      
      step2Title: '任務控制台 (Mission Dock)',
      step2Desc: '這是你的主要控制台。隨時切換「星圖」、「規劃」、「學習」或「測驗」模式。',
      
      step3Title: '超級工具 (Super Tools)',
      step3Desc: '找不到星星？按下「指南針」圖案，將手機舉向天空，地圖就會自動跟隨你轉動，幫你定位真實的星星！',
      
      step4Title: '準備出發！',
      step4Desc: '就是這麼簡單！現在，以此地為起點，飛向浩瀚無垠的宇宙吧！',

      nextBtn: '下一步',
      prevBtn: '上一步',
      startBtn: '立刻出發！'
    },
    rendering: '渲染模式',
    askMe: '你好！我是你的 Kidrise 星空嚮導。你看到了甚麼星星？問問我吧！🌟',
    lat: '緯度',
    lon: '經度',
    // New buttons
    btnUpdateLoc: '更新位置',
    btnGyro: '開啟陀螺儀',
    btnGyroOff: '關閉陀螺儀',
    btnArt: '顯示圖案',
    btnRealTime: '實時',
    // Directions
    dirN: '北',
    dirS: '南',
    dirE: '東',
    dirW: '西',
    gyroNotSupported: '您的裝置不支援或未授權陀螺儀功能。',
    locUpdated: '位置已更新！',
    sun: '太陽',
    moon: '月亮',
    // Controls
    btnZoomIn: '放大',
    btnZoomOut: '縮小',
    btnReset: '重置',
    btnPlay: '播放',
    btnPause: '暫停',
    btnSpeed: '快進',
    btnGo: '前往',
    // Menu
    menuMap: '實時星圖',
    menuPlanner: '觀星預報',
    menuCompass: '指南針',
    menuLearn: '天文知識',
    menuQuiz: '太空挑戰',
    menuGuide: '使用教學',
    menuEncyclopedia: '望遠鏡小百科',
    
    // Compass
    enableCompass: '啟用指南針',
    compassPermDesc: '為了讓指南針正常運作，我們需要您授權存取裝置的方向感測器。',
    btnGrantPerm: '✅ 同意並啟用',
    directions: ['北', '東北', '東', '東南', '南', '西南', '西', '西北'],
    compassCalibrate: '請以「8」字形揮動手機校準',


    
    // Planner
    plannerTitle: '觀星規劃 (天文台實時數據)',
    weatherCurrent: '實時分區天氣',
    weather9Day: '未來九天天氣預報',
    stargazingIndex: '觀星指數',
    conditionGood: '適合觀星',
    conditionFair: '一般',
    conditionPoor: '不宜觀星',
    cloud: '雲量',
    rain: '降雨',
    temp: '溫度',
    humidity: '濕度',
    // Status Logic
    statusClear: '天朗氣清',
    statusCloudy: '多雲',
    statusRain: '有雨/風暴',
    statusStable: '天氣穩定',
    reasonCloud: '雲層可能會遮擋星空',
    reasonRain: '天氣惡劣',
    reasonMoon: '月光太亮影響深空觀測',
    reasonGood: '觀星條件極佳！',
    reasonFair: '條件一般',
    moonNew: '新月',
    moonWaxCres: '眉月',
    moonFirstQ: '上弦月',
    moonWaxGib: '盈凸月',
    moonFull: '滿月',
    moonWanGib: '虧凸月',
    moonLastQ: '下弦月',
    moonWanCres: '殘月',
    // Astro Tips
    astroTip: '天文小貼士',
    tipGood: '觀星條件極佳！這是觀測星雲和星系的好時機。別忘了帶紅光手電筒！',
    tipBad: '能見度可能較低。建議觀測月亮或行星等明亮天體，或者學習辨認星座！',
    // Knowledge
    knowSolar: '太陽系大冒險',
    knowMoon: '月亮變變變',
    knowStar: '星星的秘密',
    knowBlackHole: '黑洞',
    knowMeteor: '流星雨',
    knowComet: '彗星',
    knowGalaxy: '星系',
    knowNebula: '星雲',
    knowEclipse: '日食/月食',
    knowConstellation: '星座',

    solarDesc: '去各大行星探險吧！',
    moonDesc: '為什麼月亮會變形？',
    starDesc: '星星顏色代表溫度？',
    blackHoleDesc: '連光都逃不掉的怪獸！',
    meteorDesc: '快點許願！',
    cometDesc: '拖著尾巴的髒雪球。',
    galaxyDesc: '星星居住的城市。',
    nebulaDesc: '星星與寶寶誕生的地方。',
    eclipseDesc: '宇宙的皮影戲。',
    constellationDesc: '天上的連連看遊戲。',
    
    // Constellation Game
    conGameLink: '將星星連起來！',
    conGameComplete: '太棒了！',
    conUrsaMajor: '大熊座 (北斗七星)',
    conCassiopeia: '仙后座',
    conOrion: '獵戶座',
    nextLevel: '下一關',
    restart: '再玩一次',



    // Elaborations
    solarContext: '想像一個大家庭圍著營火跑。太陽就是那個營火，行星就是圍著它跑的小朋友！',
    moonContext: '月亮其實不會變形！它像一個被手電筒（太陽）照著的球。當它繞著地球轉時，我們看到的亮面就會改變。',
    starContext: '星星是大火球。就像蠟燭的火焰一樣，藍色的部分其實最熱，紅色的部分反而比較「冷」喔！',

    // Star Guide
    // Guide
    btnBack: '返回',
    lblFind: '如何尋找',
    lblObserve: '觀測技巧',
    planetFact: '你知道嗎？',
    guideIntro: '探索著名恆星和天體。點擊卡片了解更多。',

    // Polaris
    guidePolaris: '北極星 (Polaris)',
    guidePolarisSub: '指北之星',
    guidePolarisDesc: '北極星非常特別，因為它在天空中的位置幾乎不變，而其他星星都繞著它轉。數百年來，水手們一直依靠它來辨別北方。',
    guidePolarisFind: '先找到北斗七星。將斗勺外側的兩顆星連成一線，向斗口方向延伸約五倍距離，就能找到北極星。',
    guidePolarisObserve: '它是一顆中等亮度的星星。即使在城市中，肉眼也能看見，但不算非常亮。',
    guidePolarisFact: '北極星其實是一個三合星系統，但它的伴星太暗了，需要望遠鏡才能看見。',

    // Sirius
    guideSirius: '天狼星 (Sirius)',
    guideSiriusSub: '夜空中最亮的星',
    guideSiriusDesc: '天狼星是全天最亮的恆星。它的名字源於希臘語，意為「發光」或「灼熱」。',
    guideSiriusFind: '先找到獵戶座腰帶（三顆連成一線的星）。沿著腰帶向左下方延伸，最亮的那顆就是天狼星。',
    guideSiriusObserve: '發出耀眼的藍白光芒。當它位置較低時，常會因為大氣擾動而閃爍出七彩光芒。',
    guideSiriusFact: '英語中「炎熱的狗日子」(Dog Days) 指的就是天狼星，因為古人認為它的熱量與太陽疊加導致了夏天的酷熱。',

    // Betelgeuse
    guideBetelgeuse: '參宿四 (Betelgeuse)',
    guideBetelgeuseSub: '紅色超巨星',
    guideBetelgeuseDesc: '參宿四是一顆巨大的紅色超巨星。如果不把它放在我們太陽系中心，它的表面會延伸到木星軌道之外！',
    guideBetelgeuseFind: '它是獵戶座左上角那顆明亮的橙紅色星星（獵人的肩膀）。',
    guideBetelgeuseObserve: '肉眼可見明顯的橙紅色。它是天空中最容易通過顏色辨認的星星之一。',
    guideBetelgeuseFact: '參宿四「很快」就會演化成超新星——在天文學上，「很快」意味著未來十萬年內。',

    // Orion Nebula
    guideOrionNebula: '獵戶座大星雲',
    guideOrionNebulaSub: '恆星托兒所',
    guideOrionNebulaDesc: '獵戶座大星雲是一團巨大的氣體和塵埃雲，新恆星正在那裡誕生。它是肉眼可見最亮的星雲之一。',
    guideOrionNebulaFind: '在獵戶座腰帶下方尋找「寶劍」。星雲位於寶劍中間那顆看起來毛茸茸的星星位置。',
    guideOrionNebulaObserve: '肉眼看去像一顆模糊的星星。用雙筒望遠鏡可以看到淡淡的霧氣。透過天文望遠鏡可見其扇形結構。',
    guideOrionNebulaFact: '它的直徑約 24 光年。我們今天看到的光，是在羅馬帝國衰落時期發出的。',

    // Pleiades
    guidePleiades: '以此七星團 (Pleiades)',
    guidePleiadesSub: '七姊妹星團',
    guidePleiadesDesc: '昴宿星團是一個美麗的疏散星團，由中年、高溫的 B 型恆星組成。通常人們會挑戰自己能數出幾顆星星。',
    guidePleiadesFind: '沿著獵戶座腰帶向右下方延伸，經過畢宿五，就能找到這個小小的星團。',
    guidePleiadesObserve: '看起來像一個迷你的斗勺。大多數人肉眼能看到 6 顆星，但用雙筒望遠鏡能看到數十顆。',
    guidePleiadesFact: '在日本，這個星團被稱為「Subaru」（昴），也是著名汽車品牌的標誌。',

    // Rigel
    guideRigel: '參宿七 (Rigel)',
    guideRigelSub: '藍色超巨星',
    guideRigelDesc: '參宿七是獵戶座中最亮的星 (比參宿四還亮)。它是一顆年輕、熾熱的藍色超巨星。',
    guideRigelFind: '它是獵戶座右下角那顆明亮的藍白色星星（獵人的腳）。',
    guideRigelObserve: '它發出強烈的藍白光。與橙紅色的參宿四形成強烈對比。',
    guideRigelFact: '參宿七非常亮，如果把它放在太陽的位置，我們都會被瞬間烤焦！它的亮度是太陽的數萬倍。',

    // Aldebaran
    guideAldebaran: '畢宿五 (Aldebaran)',
    guideAldebaranSub: '金牛座之眼',
    guideAldebaranDesc: '畢宿五是一顆橙色巨星，代表金牛座那一隻憤怒的眼睛。它的名字來自阿拉伯語，意為「追隨者」（追隨昴宿星團）。',
    guideAldebaranFind: '沿著獵戶座腰帶向右上方延伸，第一顆遇到的亮橙色星星就是它。',
    guideAldebaranObserve: '顏色是明顯的橙色。它位於一個V字形的星群（畢宿星團）中，但其實它比那個星團更靠近我們。',
    guideAldebaranFact: '先鋒10號探測器正朝著畢宿五的方向飛去，預計兩百萬年後會到達那裡。',

    // Arcturus
    guideArcturus: '大角星 (Arcturus)',
    guideArcturusSub: '牧夫座守護者',
    guideArcturusDesc: '大角星是北半球夜空中最亮的恆星（全天第四亮）。它是一顆橙色巨星。',
    guideArcturusFind: '沿著北斗七星斗柄的曲線延伸出去（春季大曲線），第一顆遇到的亮星就是大角星。',
    guideArcturusObserve: '它閃爍著金黃色或橙色的光芒。',
    guideArcturusFact: '大角星並不是「本地人」，它來自一個被銀河系吞併的矮星系，正快速穿越我們的銀河盤面。',
    
    // Vega
    guideVega: '織女一 (Vega)',
    guideVegaSub: '夏夜女王',
    guideVegaDesc: '織女一是夏季大三角中最亮的一顆星。它發出藍白色的光芒，曾經是我們的北極星（以後也會是）。',
    guideVegaFind: '在夏季的頭頂附近，尋找最亮的那顆藍白星。',
    guideVegaObserve: '非常明亮且呈現藍白色。它是天文學家用來定義「0等星」的標準星。',
    guideVegaFact: '因為地球自轉軸的擺動，大約在西元14000年，織女一將會取代現在的勾陳一成為新的北極星。',

    // Altair
    guideAltair: '河鼓二 (Altair)',
    guideAltairSub: '牛郎星',
    guideAltairDesc: '河鼓二（牛郎星）是天鷹座的主星，也是夏季大三角的其中一角。它自轉速度非常快！',
    guideAltairFind: '在夏季大三角中，位於織女星對面，兩旁各有一顆暗星伴隨的就是牛郎星。',
    guideAltairObserve: '一顆明亮的白色恆星。',
    guideAltairFact: '它自轉極快，赤道部分的轉速達到每小時90萬公里，導致它變成了一個扁扁的橢球體。',

    // Antares
    guideAntares: '心宿二 (Antares)',
    guideAntaresSub: '火星的對手',
    guideAntaresDesc: '心宿二是一顆紅超巨星，代表天蠍座的心臟。它的名字意為「阿瑞斯（火星）的對手」，因為它們顏色很像。',
    guideAntaresFind: '在夏季南方的天空中，尋找一顆紅色的亮星。如果你看到像鉤子一樣的星星排列，那就是天蠍座。',
    guideAntaresObserve: '明顯的紅色。當它和火星靠得很近時，可以比較一下它們的顏色。',
    guideAntaresFact: '它非常巨大，如果放在太陽系中心，它的表面會吞沒火星軌道！',

    // Andromeda Galaxy
    guideAndromedaGalaxy: '仙女座大星系 (Andromeda)',
    guideAndromedaGalaxySub: '我們的鄰居',
    guideAndromedaGalaxyDesc: '仙女座大星系是距離我們最近的巨大螺旋星系。它是肉眼能看到最遠的物體（距離250萬光年）。',
    guideAndromedaGalaxyFind: '先找到仙女座，在奎宿九（Mirach）上方尋找一團模糊的光斑。秋季觀測最佳。',
    guideAndromedaGalaxyObserve: '肉眼看像一團模糊的棉花球。雙筒望遠鏡可以看見橢圓的光暈。',
    guideAndromedaGalaxyFact: '它正以每秒110公里的速度衝向我們！預計45億年後會和我們的銀河系主要發生碰撞。',

    // New Content
    blackHoleContext: '黑洞的引力超級強，連光都跑不掉！它就像宇宙原本的一個超大吸塵器。',
    meteorContext: '流星其實是太空中的小石頭，撞到地球空氣燃燒發光，看起來就像畫過天空的線！',
    cometContext: '彗星是來自深空的髒雪球。當它靠近太陽時，冰會融化，變出一條漂亮的尾巴。',
    galaxyContext: '我們住在銀河系。它就像一個巨大的旋轉城市，裡面住了無數的星星、氣體和塵埃。',
    nebulaContext: '星雲是氣體和灰塵組成的雲。它是星星寶寶出生的地方喔！',
    eclipseContext: '當月亮剛好跑到太陽和地球中間，擋住了陽光，就會發生日食，就像手影遊戲一樣！',
    constellationContext: '很久以前，人們把天上的星星連起來，畫成英雄和動物的樣子，這就是星座。',

    // Solar System
    // sun: '太陽', // Already defined above
    mercury: '水星',
    venus: '金星',
    earth: '地球',
    mars: '火星',
    jupiter: '木星',
    saturn: '土星',
    uranus: '天王星',
    neptune: '海王星',
    planetFactSolar: '有趣小知識',
    sunFact: '太陽其實是一顆星星！它是我們太陽系的老大，佔了99.8%的質量喔。',
    mercuryFact: '水星是最小的行星，而且跑得最快，繞太陽一圈只要88天！',
    venusFact: '金星是最熱的行星，比水星還熱！因為它有厚厚的雲層蓋著。',
    earthFact: '我們的家！目前宇宙中唯一知道有生命的地方。要好好愛護它喔！',
    marsFact: '火星也叫紅色星球。科學家派了好多機器人去那裡探險！',
    jupiterFact: '木星是最大的行星！它大到可以塞進1300個地球。',
    saturnFact: '土星有最漂亮的呼啦圈（光環），是由冰塊和石頭組成的。',
    uranusFact: '天王星是躺著轉的！它是最冷的行星之一。',
    neptuneFact: '海王星離太陽最遠，那裡的風超級大，是音速的5倍！',
    // Quiz
    quizTitle: '太空學員訓練',
    quizIntro: '準備好成為一位太空探險家了嗎？完成測驗並答對60%以上，即可獲得太空人證書！',
    quizStart: '開始任務',
    quizNext: '下一題',
    quizRetry: '再玩一次',
    quizScore: '得分',
    quizRank: '軍階',
    quizCorrect: '答對了！太棒了！🎉',
    quizWrong: '哎呀！再接再厲！💪',
    quizComplete: '訓練完成！',
    
    // Certificate
    resultTitle: '測驗結果',
    enterName: '輸入你的名字領取證書',
    download: '下載證書',
    certificate: '及格證書',
    certifiedBy: 'Kidrise 科學團隊',
    date: '日期',
    certNamePlaceholder: '輸入你的名字...',
    good: '做得好！你對宇宙非常了解！',
    perfect: '完美！你是真正的天文大師！',
    tryAgain: '別灰心，再試一次吧！',
    
    // Ranks
    rank1: '太空菜鳥 (Space Rookie)',
    rank2: '星際探險家 (Star Explorer)',
    rank3: '火箭隊長 (Rocket Captain)',
    rank4: '銀河守護者 (Galactic Guardian)',
    rank5: '宇宙大師 (Universe Master)',

    // Quiz UI
    quizQuestionCount: '第 {0}/{1} 題',
    quizCurrentScore: '分數：{0}',
    
    // Certificate Content
    certTitle: 'Certificate of Achievement',
    certCertifies: 'This certifies that',
    certCompleted: 'has successfully completed the STAR CADET TRAINING',
    certScore: 'with a score of',
    certDemonstrating: 'demonstrating excellent knowledge of the Telescope and Universe.',
    certDate: 'Date',
    certTeam: 'Kidrise Team',
    certOfficial: 'OFFICIAL',

    // Questions
    q1: '哪顆星星是夜空中最亮的？',
    q1a: ['天狼星', '織女星', '北極星'],
    q2: '距離太陽最近的行星是哪一顆？',
    q2a: ['金星', '火星', '水星'],
    q3: '月亮變圓的時候，我們叫它什麼？',
    q3a: ['新月', '滿月', '上弦月'],
    q4: '太陽系最大的行星是誰？',
    q4a: ['地球', '木星', '土星'],
    q5: '我們居住的星系叫什麼名字？',
    q5a: ['仙女座星系', '銀河系', '黑眼星系'],
    q6: '什麼顏色的星星溫度最高？',
    q6a: ['紅色', '黃色', '藍色'],
    q7: '地球有多少顆天然衛星（月亮）？',
    q7a: ['1顆', '2顆', '0顆'],
    q8: '被稱為「紅色星球」的是哪一顆？',
    q8a: ['火星', '金星', '木星'],
    q9: '太陽主要是由什麼氣體組成的？',
    q9a: ['氧氣', '氫氣和氦氣', '二氧化碳'],
    q10: '誰有美麗的行星光環（呼啦圈）？',
    q10a: ['土星', '火星', '水星'],
    q11: '流星其實是什麼？',
    q11a: ['掉下來的星星', '燃燒的太空石頭', '外星人的飛船'],
    q12: '什麼東西連光都逃不掉？',
    q12a: ['太陽', '黑洞', '月亮'],
    q13: '我們看星星的時候，其實是在看？',
    q13a: ['過去的樣子', '未來的樣子', '現在的樣子'],
    q14: '北極星可以幫我們找到哪個方向？',
    q14a: ['南方', '北方', '東方'],
    q15: '人類第一次登陸月球是在哪一年？',
    q15a: ['1969年', '2000年', '1800年'],

    // Explanations
    q1_explain: '沒錯！天狼星是除了太陽以外，我們能看到最亮的恆星。它其實是兩顆星星在一起喔！',
    q2_explain: '答對了！水星離太陽最近，所以它白天超級熱，但因為沒有大氣層保溫，晚上又超級冷！',
    q3_explain: '正確！當我們看到圓圓的月亮時，那就是滿月。這是因為太陽光直接照亮了月亮的正面。',
    q4_explain: '太棒了！木星是太陽系裡的大巨人，比所有其他行星加起來還要大兩倍以上！',
    q5_explain: '沒錯！我們住在銀河系，它看起來像一條流過夜空的銀色河流。',
    q6_explain: '答對了！藍色的星星燃燒得最劇烈，溫度最高。紅色的星星反而比較冷喔。',
    q7_explain: '正確！地球只有一顆天然衛星，就是我們的月亮。',
    q8_explain: '沒錯！火星表面有很多氧化鐵（就像生鏽一樣），所以看起來紅紅的。',
    q9_explain: '答對了！太陽是個巨大的氣體球，主要由氫氣和氦氣組成，不停地進行核融合反應發光發熱。',
    q10_explain: '正確！土星環非常壯觀，主要由冰塊、石頭和灰塵組成。',
    q11_explain: '沒錯！流星是太空中的小石頭掉進大氣層時，摩擦燃燒產生的光芒。',
    q12_explain: '答對了！黑洞的引力非常強大，連速度最快的光都被吸進去，所以我們看不見它。',
    q13_explain: '正確！星星離我們很遠，光走過來需要時間。所以我們看到的是它們過去的樣子！',
    q14_explain: '沒錯！北極星幾乎就在地球北極的正上方，所以它能幫我們指引北方。',
    q15_explain: '太棒了！1969年，阿姆斯壯成為第一個踏上月球的人類。他說：「這是我的一小步，卻是人類的一大步。」',

    // Moon Phase
    moonPhaseTitle: '拖動滑桿看看月亮怎麼變！',
    moonDay: '農曆初',
    moonReasonNew: '月亮躲在地球和太陽中間，我們看不到它！',
    moonReasonWax: '月亮慢慢跑出來了，像眉毛一樣。',
    moonReasonFull: '月亮跑到地球後面，太陽光把它的臉照得圓圓的！',
    moonReasonWan: '月亮慢慢變小了，要回家睡覺了。',
    // Star Color
    starColorTitleWhy: '為什麼星星有不同顏色？',
    starColorTitle: '星星顏色與溫度',
    tempLow: '低溫 (約 3,000°C)',
    tempMid: '中溫 (約 6,000°C)',
    tempHigh: '高溫 (約 25,000°C+)',
    starRed: '紅巨星',
    starYellow: '像太陽一樣',
    starBlue: '藍巨星',
    starColorDesc: '你看！雖然紅色水龍頭代表熱水，但在宇宙中，紅色的星星其實是最冷的！藍色的星星才是最熱的喔！',
    scalePlanet: '星球',
    btnCamera: '太空明信片',
    postcard: {
       title: '太空明信片',
       loading: '正在拍照...',
       addSticker: '貼紙',
       addText: '寫字',
       save: '儲存',
       close: '關閉',
       placeholder: '你好，太空！',
       saved: '已儲存！'
    },
    scavenger: {
        mission: '任務',
        find: '尋找',
        foundIt: '發現目標！',
        foundMsg: '你找到了',
        nextTarget: '下一個目標',
        complete: '任務完成！',
        keepSteady: '保持穩定...',
        lookAround: '拖動星圖或轉動手機來搜尋',
        startTitle: '星際尋寶獵人',
        startDesc: '準備好了嗎？讓我們來找出隱藏在星空中的寶藏！',
        startBtn: '開始任務'
    },

    // Detailed Explanations
    expl: {
        // Black Hole
        blackHole: {
            what: '黑洞是宇宙中的超級吸塵器！它的質量非常大，引力強到連光都跑不掉。',
            why: '當一顆超大恆星死掉後，因為太重了，自己塌陷成一個小點，就形成了黑洞。',
            anim: '動畫顯示中間黑色的圓是「事件視界」，那是進去就出不來的界線。周圍亮亮的是被吸進去的氣體！'
        },
        // Meteor
        meteor: {
            what: '流星不是星星，而是太空中掉下來的小石頭或灰塵。',
            why: '當這些小石頭高速衝進地球，會和空氣摩擦燒起來，發出一道光，這就是流星。',
            anim: '注意看！畫面上劃過天空的亮線就是流星。點擊天空可以召喚更多流星許願喔！'
        },
        // Comet
        comet: {
            what: '彗星是來自遙遠太空的「髒雪球」，由冰和塵埃組成。',
            why: '當它稍微靠近太陽時，冰受熱變成氣體，噴出來就變成了長長的尾巴。',
            anim: '看看那條白色的尾巴！它總是背對著太陽（橘色圓點）。拖動滑桿看看它靠近太陽時尾巴怎麼變長。'
        },
        // Galaxy
        galaxy: {
            what: '星系是星星的超級大城市。我們的太陽就住在「銀河系」這座城市裡。',
            why: '引力把數千億顆恆星、氣體和塵埃拉在一起，讓它們繞著中心旋轉。',
            anim: '這是一個螺旋星系。你可以調整傾斜角度，看看它扁扁的形狀，就像一個旋轉的盤子！'
        },
        // Nebula
        nebula: {
            what: '星雲是漂浮在宇宙中的美麗雲朵，由氣體和灰塵組成。',
            why: '有些星雲是星星死掉後留下的，有些則是新星星誕生的地方（恆星托兒所）。',
            anim: '這些彩色的雲氣正在慢慢移動。在真實宇宙中，這些顏色代表不同的氣體，比如紅色的氫氣。'
        },
        // Eclipse
        eclipse: {
            what: '日食就是月亮跑到太陽前面，把太陽光擋住的遊戲。',
            why: '因為月亮繞地球轉，有時候剛好擋在太陽和地球中間，就會發生日食。',
            anim: '拖動月亮（灰色圓）去遮住太陽（橘色圓）。完全遮住時（日全食），你會看到周圍有一圈光，那是太陽的日冕！'
        },
        // Solar System
        solar: {
            what: '太陽系就是太陽的一家人。太陽在中間，八顆行星繞著它轉。',
            why: '太陽太重了，它的引力抓住所有行星，讓它們乖乖繞圈圈，不會亂跑。',
            anim: '這些圈圈是行星的軌道。點擊任何一顆行星，看看它們的樣子和關於它們的小秘密！'
        },
        // Moon Phases
        moonPhase: {
            what: '月相就是月亮形狀的變化。有時候圓圓的，有時候像眉毛。',
            why: '其實月亮不會變形！是因為太陽光照亮月亮的角度不同，我們在地球上看到的亮面就不一樣。',
            anim: '拖動滑桿讓時間快轉！觀察月亮旁邊的陰影怎麽移動，讓月亮變圓又變缺。'
        },
        // Star Colors
        starColor: {
            what: '星星的顏色告訴我們它的溫度。這就像火焰一樣！',
            why: '越熱的火是藍色的，比較冷的火是紅色的。星星也一樣！',
            anim: '拖動滑桿改變溫度。看！溫度低時變成紅色大星星，溫度高時變成藍色小星星。'
        },
        // Space Scale
        spaceScale: {
            what: '這個工具可以讓你知道如果你住在別的星球，你的體重會變成多少。',
            why: '每個星球的引力（地心吸力）都不同！像木星引力很大，你就會變很重；月亮引力很小，你就會變很輕。',
            anim: '輸入你的體重，我們幫你算出在其他星球的數字。看看下方的「跳躍高度」，在月球上你可以跳得超級高喔！'
        }
    },

    // WIZARD GUIDE (Expanded to 8 steps)
    wizard: {
        steps: [
            {
                title: '1. 開箱檢查 (Unboxing)',
                desc: '打開盒子，確認所有零件都在：主鏡筒、三腳架、尋星鏡、天頂鏡、兩個目鏡 (H20mm, H6mm) 、底座和鏡筒固定器。請小心輕放，不要觸摸任何玻璃鏡片喔！',
                note: '將所有零件平放在桌面上，清點好再開始！'
            },
            {
                title: '2. 架設三腳架 (Tripod)',
                desc: '將三腳架的三條腿完全拉開，並鎖緊固定旋鈕。確保它在地面上站得穩穩的，不會搖晃。',
                note: '穩固的地基是觀測成功的關鍵！'
            },
            {
                title: '3. 安裝旋轉鎖 (Rotary Lock) 固定底座 (Base)',
                desc: '先將底座孔洞與三角架孔洞位置對齊，使用旋轉鎖螺絲穿越孔洞，並用旋鈕固定旋轉鎖。',
                note: '不要鎖得太死，以免損壞螺絲，只要穩固即可。'
            },
            {
                title: '4. 安裝天頂鏡與目鏡',
                desc: '將「天頂鏡」（呈90度的黑色彎頭）插入主鏡筒後端，鎖緊。然後放入倍率最低的目鏡標示「H20」），也鎖緊。',
                note: '永遠從低倍率 (H20) 開始尋找目標，找到後再換高倍率 (H6)！'
            },
            {
                title: '5. 安裝主鏡筒 (Mounting)',
                desc: '將主鏡筒置於底座上，把鏡筒固定器套入底座軌道，旋緊頂部的鎖定旋鈕。手要扶著鏡筒直到確認鎖緊為止，以免滑落。',
                note: '小心輕放，確保鏡筒穩固。'
            },
            {
                title: '6. 安裝尋星鏡 (Finder)',
                desc: '找到鏡筒上方的小支架，將尋星鏡（小望遠鏡）插入。',
                note: '注意尋星鏡的方向，應該是大鏡頭朝前（指向目標）。'
            },
            {
                title: '7. 校準 (Alignment) 及觀測 (First Light)',
                desc: '在白天，將望遠鏡對準遠處的一個目標（如避雷針尖端）。先用「尋星鏡」找到目標，然後調整主鏡筒確認目標在視野中。晚上將望遠鏡搬到戶外。先用「尋星鏡」找到月亮，然後調整主鏡筒 (或切換目鏡），你應該就能看到月亮了！',
                note: '慢慢轉動調焦輪，直到月球坑洞變得清晰銳利。'
            }
        ]
    },

    // Space Scale
    scaleTitle: '太空體重計',
    scaleDesc: '看看你在其他星球上有幾公斤！',
    enterWeight: '輸入體重 (kg)',
    pluto: '冥王星',

    // Star Colors
    starOrange: '橘色',
    starWhite: '白色',
    tempCold: '冷',
    tempHot: '熱！',

    // Interactive Modules
    interactive: {
        tapCard: '點擊卡片開始你的太空冒險！',
        btnBack: '返回',
        // Black Hole
        eventHorizon: '事件視界大小',
        gravitySlider: '拖動滑桿改變重力！',
        // Meteor
        tapSky: '點擊天空許願！',
        // Comet
        orbitPos: '軌道位置',
        cometTip: '注意看！彗星越靠近太陽，尾巴就越長越亮，而且永遠背對太陽！',
        // Galaxy
        tilt: '傾斜角度',
        rotation: '旋轉速度',
        // Nebula
        nursery: '恆星托兒所模擬',
        // Eclipse
        totality: '全食！🌑',
        partial: '偏食 🌗',
        daytime: '白天 ☀️',
        eclipseSlider: '拖動月亮來遮住太陽！'
    },

    
    // TELESCOPE ENCYCLOPEDIA (Renamed from manual)
    encyclopedia: {
      title: 'EYES TO NEW HORIZONS',
      subtitle: '神奇望遠鏡：觀星手冊與使用指南',
      intro: '探索夜空指南',
      features: '特色功能',
      featuresDesc: '探索宇宙的奧秘，學習如何尋找星星、星座、行星和月球特徵。',
      specs: '60倍放大 | HD 鍍膜鏡片 | 簡易組裝',
      kidrise: 'Kidrise',
      
      componentsTitle: '望遠鏡組件',
      caution: '警告：切勿透過望遠鏡直接觀測太陽，以免對眼睛造成永久傷害。',
      partsList: [
        { name: 'H20 目鏡', qty: '1 件', icon: 'fa-eye' },
        { name: 'H6 觀月鏡', qty: '1 件', icon: 'fa-moon' },
        { name: '天頂鏡', qty: '1 件', icon: 'fa-share' }, // zenith mirror
        { name: '尋星鏡連支架', qty: '1 組', icon: 'fa-crosshairs' },
        { name: '掌上指南針', qty: '1 件', icon: 'fa-compass' },
        { name: '360° 旋轉折疊支架 (39.5cm)', qty: '1 組', icon: 'fa-tripod' }
      ],
      
      focusTitle: '調焦教學與注意事項',
      focusSteps: [
          { title: '尋找目標', desc: '將鏡筒對準觀測目標，建議先從遠處建築物開始練習。' },
          { title: '進行調焦', desc: '在目鏡處觀測，緩慢調節調焦手輪，直至影像清晰。' }
      ],
      focusNote: '💡 重要提示： 天文望遠鏡設有「最近成像距離」。此型號的最近成像距離約為 20 米。若觀測目標距離少於 20 米，將無法成功對焦成像。此外，由於光學原理，望遠鏡看到的影像通常是顛倒的，這是正常現象，如需正像則需加裝正像稜鏡。',

      proTitle: '🔭 專業級光學配置',
      proFeatures: [
          { title: '天地兩用', desc: '配備可更換目鏡，無論是觀測遠處建築、山脈，還是夜空中的星體，都能輕鬆應對。' },
          { title: '50mm 大口徑光學玻璃', desc: '採用多層鍍膜鏡片，大幅提升聚光能力與分辨率，確保視野明亮清晰。' },
          { title: '多重護眼鍍膜', desc: '包含加硬保護膜、抗油污防霧層、防藍光膜層及防宇宙射線膜層，全方位呵護孩子發育中的視網膜。' },
          { title: '5x24 尋星鏡', desc: '幫助孩子快速定位目標天體，減少尋找星體時的挫敗感。' }
      ],
      
      parts: {
        eyepieceLock: '目鏡鎖',
        objectiveLens: '物鏡',
        lensHood: '遮光罩',
        mainMirror: '主鏡筒',
        rotaryLock: '旋轉鎖',
        hoop: '鏡箍',
        finder: '尋星鏡',
        eyepiece: '目鏡',
        zenithMirror: '天頂鏡',
        focusAdjustor: '調焦輪',
        tripod: '三腳架',
        liftLock: '升降鎖',
        footTubeLock: '腳管鎖扣',
        plateBuckle: '托盤扣',
        horseshoeFoot: '馬蹄腳'
      },
      
      assemblyTitle: '望遠鏡組裝',
      assemblySteps: {
        1: '1. 底座旋轉鎖鈕',
        2: '2. 目鏡安裝',
        3: '3. 主鏡筒安裝',
        4: '4. 鏡箍固定',
        5: '5. 尋星鏡安裝'
      },
      
      nightSkyTitle: '夜空',
      nightSkyDesc: '在晴朗的夜晚，你可以看到成千上萬顆星星。但你所見的只是浩瀚宇宙的一小部分。除了星星，太空中還有行星、衛星、氣體雲和巨大的虛空。',
      measuringSpaceTitle: '測量宇宙',
      measuringSpaceDesc: '宇宙中的距離大得難以想像。科學家使用「光年」來測量。一光年約為 9.46 萬億公里，即光在一年內行進的距離。',
      
      brightStarsTitle: '明亮的星星',
      brightStarsDesc: '星星看起來像夜空中的小亮點，其實它們是巨大的高溫氣體球。它們看起來很小是因為距離非常遙遠。太陽是離我們最近的恆星。',
      pleiadesDesc: '這是一個被稱為「昴宿星團」(七姊妹星團) 的星群，包含約 500 顆星星。在晴朗的夜晚，肉眼可見其中最亮的七顆。',
      
      galaxiesTitle: '星系',
      galaxiesDesc: '星星聚集在巨大的群體中，稱為「星系」，每個星系由數十億顆星星組成。用強力望遠鏡可以看到許多星系。',
      
      planetsMoonsTitle: '行星與衛星',
      planetsMoonsDesc: '行星是繞恆星運行的大塊岩石或氣體球。地球是繞太陽運行的行星之一。衛星是繞行星運行的岩石或冰球。地球只有一顆衛星——月球。木星則至少有 61 顆衛星！',
      
      solarSystemTitle: '我們的太陽系',
      solarSystemDesc: '太陽、行星及其衛星，以及所有繞太陽運行的物體統稱為「太陽系」。太陽的引力將所有物體保持在軌道上。',
      
      changingSkyTitle: '變幻的星空',
      changingSkyDesc: '我們在天空中看到雖然看似不變，其實一直在變化。星星在夜晚的位置會改變，不同季節也會看到不同的星星。這都是因為地球的運動。',
      spinningEarthTitle: '旋轉的地球',
      spinningEarthDesc: '地球每 24 小時自轉一圈。這讓我們覺得太陽和星星在繞著我們轉，但其實是我們在轉動！',
      
      whereOnEarthTitle: '身在何處？',
      whereOnEarthDesc: '你能看到的星星取決於你在地球上的位置（北半球或南半球）。例如，北斗七星在北半球可見，但在南半球不可見；南十字座則相反。',
      
      usingTelescopeTitle: '使用望遠鏡',
      telescopeTypesDesc: '望遠鏡主要分為兩類：折射式 (Refractor) 和反射式 (Reflector)。本望遠鏡為折射式。',
      refractorDesc: '折射式望遠鏡使用透鏡。光線從物鏡進入，透過目鏡放大。',
      reflectorDesc: '反射式望遠鏡使用鏡子收集光線。',
      
      powerTitle: '倍率與目鏡',
      powerDesc: '放大倍率 (Power) 取決於目鏡。例如 60X 代表放大 60 倍。焦距越短的目鏡，放大倍率越大。',
      
      observingTitle: '觀測指南',
      observingSteps: {
        1: '1. 先用低倍率目鏡，視野較廣，較容易找到目標。',
        2: '2. 使用尋星鏡 (Finder) 將目標對準十字中心。',
        3: '3. 從主目鏡觀看，並慢慢轉動調焦輪，直到影像清晰。'
      },
      
      moonTitle: '月球觀測',
      moonDesc: '月球是夜空中第二亮的天體。你可以看到撞擊坑 (Craters)、月海 (Maria) 和山脈 (Mountains)。',
      moonPhases: '月相變化：新月、盈凸月、滿月、虧凸月、殘月等，是因為我們看到的受光面不同。',
      
      eclipseTitle: '日食與月食',
      eclipseDesc: '當地球、月球和太陽連成一線時會發生食。日食是月球擋住太陽；月食是地球擋住射向月球的陽光。',
      
      careTitle: '保養與維護',
      careDesc: '請將望遠鏡存放在無塵乾燥處。清潔鏡片時請使用專用拭鏡布，切勿使用粗糙布料。',
      
      footer: 'Kidrise STEM Educational Toys (HK) | www.stemtoy.com.hk'
    },
    // How to Use Guide
    howToUse: {
        title: '星圖使用方法',
        step1Title: '1. 自選時間／用實時功能',
        step1Desc: '您可以按功能列上的 [CLOCK] 設定想要的時間，或是使用「實時」功能回到現在。時間設定：設定日期與時間，或回到實時。',
        step2Title: '2. 對齊觀測時間',
        step2Desc: '轉動星盤，將觀測日期（如：10月1日）對準觀測時間（如：下午9時）。您可按 [SKY] 或 [PLUS] 鍵只放大橢圓窗口；窗口內的星空即為香港當時可見的星座。',
        step3Title: '3. 辨認方位',
        step3Desc: '您可以按功能列上的 [COMPASS] 來知道自己在什麼方位。尋找方向，如下列例子所示，拿着旋轉星圖，便可得知夜空中星座的名稱。',
        step4Title: '4. 觀測技巧',
        step4Desc: '觀看北方時，請將「北」字向下，並將星盤高舉過頭仰望。這時星盤上的星星排列，就會跟您眼前看到的真實星空完全一致！想要觀測其他方位？只需轉身並將相應的方位字向下即可。',
        step5Title: 'App 操作指南',
        note: '在 Web App 中，我們模擬了真實星盤的操作體驗：\n\n1.【改變時間】：您可以拖動黑色的星盤、日期環，甚至直接按住黑色背景區域滑動，就能快速穿梭時間！\n2.【移動整張星圖】：按住最外層的半透明外框，即可拖曳整個星圖的位置。\n3.【放大縮小】：電腦版請使用滑鼠滾輪；手機版請用雙指開合手勢縮放。'
    },
    mapStyleInfo: {
        western: '國際 (IAU)：顯示國際天文學聯合會定義的 88 個現代星座，包含 4 等以上的恆星。',
        chinese: '中國：顯示中國古代星官系統 (三垣二十八宿)。',
        urban: '市區：僅顯示在光害嚴重的城市夜空中較易看見的亮星與主要星座連線。'
    },
    // Button Legend
    buttonLegend: {
        title: 'App 按鈕說明',
        time: '時間設定：設定日期與時間，或回到實時。',
        animation: '播放／暫停：控制星空旋轉動畫。',
        speed: '速度控制：調整星空旋轉的速度 (1x - 100x)。',
        style: '星圖風格：切換國際、中國或市區觀測模式。',
        zoomIn: '放大：拉近星圖。',
        zoomOut: '縮小：拉遠星圖。',
        reset: '重置：回到預設大小 (100%)。',
        zoomSky: '全天視野：自動縮放至完整可見天空。',
        guide: '星盤教學：查看如何使用實體旋轉星盤。',
        compass: '指南針：開啟手機指南針模式，舉起手機對準天空！',
        legend: '按鈕說明：開啟此說明頁面。',
        close: '關閉'
    },
    login: {
        title: '輸入通行證號碼',
        desc: '請輸入盒裝上的通行證號碼以開啟望遠鏡探險之旅',
        placeholder: '輸入代碼',
        error: '代碼無效，請檢查後再試',
        submit: '開始探索'
    },
  },
  'en': {
    appTitle: 'Kidrise Sky Explorer',
    homeTitle: 'Kidrise Telescope Explorer',
    homeSlogan: 'Start your scientific journey!',
    homeExperience: {
      prompt: 'What would you like to do tonight? Pick a mission and we will guide you.',
      beginner: 'Beginner',
      advanced: 'Advanced',
      beginnerDesc: 'Keeps the star map, tonight’s picks and guide for first-time users.',
      advancedDesc: 'Shows the complete knowledge, quiz and advanced toolkit.',
      replayGuide: 'Replay first-time guide',
      tasks: {
        map: { title: 'Open the Live Star Map', desc: 'See the sky and constellation directions for Hong Kong now.', action: 'Open map' },
        tonight: { title: 'Tonight’s Picks', desc: 'Choose simple targets using weather, Moon phase and season.', action: 'See recommendations' },
        resume: { title: 'Continue Exploring', desc: 'Return to your most recent page: {page}.', empty: 'Complete one mission and you can quickly return here.', action: 'Continue' },
      },
    },
    subtitle: 'Real-time Star Chart for Young Astronomers',
    visitShop: 'Visit Shop',
    locationTitle: 'Location',
    myGps: 'My GPS',
    hkDef: 'HK (Def)',
    viewingFrom: 'Viewing from:',
    gpsLocation: 'GPS Location',
    hongKong: 'Hong Kong',
    timeTravel: 'Time Travel',
    now: 'NOW',
    viewMode: 'View Mode',
    wideSky: 'Wide (Sky)',
    globe3d: 'Globe (3D)',
    chatPlaceholder: 'Ask about stars...',
    chatThinking: 'Thinking...',
    chatError: 'Signal lost! Try again.',
    chatTitle: 'Star Guide',
    chatSubtitle: 'Powered by Gemini AI',
    tutorial: {
      welcomeTitle: 'Welcome to Kidrise Explorer!',
      welcomeDesc: 'I am your AI Co-pilot. Ready to explore the universe together?',
      
      step1Title: 'Select Time / Real-time',
      step1Desc: 'Tap "Real-time" to sync with now, or use Time Travel to visit any date and time.',
      
      step2Title: 'Align Observation Time',
      step2Desc: 'Rotate the star dial to align your desired date with the time to see the sky for that moment.',
      
      step3Title: 'Identify Direction',
      step3Desc: 'Tap the Compass button and point your phone at the sky to identify directions easily.',
      
      step4Title: 'Observation Tips',
      step4Desc: 'Hold the map with "N" down when facing North. Use a red flashlight to preserve night vision.',

      nextBtn: 'Next',
      prevBtn: 'Back',
      startBtn: 'Let\'s Go!'
    },
    rendering: 'Rendering',
    askMe: "Hi! I'm your Kidrise Star Guide. Ask me anything about the stars you see! 🌟",
    lat: 'Lat',
    lon: 'Lon',
    // New buttons
    btnUpdateLoc: 'Update Location',
    btnGyro: 'Enable Gyro',
    btnGyroOff: 'Disable Gyro',
    btnArt: 'Show Art',
    btnRealTime: 'Real-time',
    // Directions
    dirN: 'N',
    dirS: 'S',
    dirE: 'E',
    dirW: 'W',
    gyroNotSupported: 'Gyroscope not supported or permission denied.',
    locUpdated: 'Location Updated!',
    sun: 'Sun',
    moon: 'Moon',
    // Menu
    menuMap: 'Star Map',
    menuPlanner: 'Planner',
    menuCompass: 'Compass',
    menuLearn: 'Knowledge',
    menuQuiz: 'Space Quiz',
    menuGuide: 'Usage Guide',
    menuEncyclopedia: 'Telescope Encyclopedia',

    // Compass
    enableCompass: 'Enable Compass',
    compassPermDesc: 'To use the compass, we need your permission to access the device orientation sensors.',
    btnGrantPerm: '✅ Agree & Enable',
    directions: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    compassCalibrate: 'Wave phone in figure 8 to calibrate',


    postcard: {
       title: 'Space Postcard',
       loading: 'Capturing...',
       addSticker: 'Stickers',
       addText: 'Text',
       save: 'Save',
       close: 'Close',
       placeholder: 'Hello Space!',
       saved: 'Saved!'
    },

    scavenger: {
        mission: 'Mission',
        find: 'Find',
        foundIt: 'Found it!',
        foundMsg: 'You found',
        nextTarget: 'Next Target',
        complete: 'Mission Complete!',
        keepSteady: 'Hold steady...',
        lookAround: 'Drag map or rotate phone to search',
        startTitle: 'Star Scavenger Hunt',
        startDesc: 'Ready? Let\'s find hidden treasures in the sky!',
        startBtn: 'Start Mission'
    },
    // Duplicates removed

    // Planner
    plannerTitle: 'Stargazing Planner (HKO Live)',
    weatherCurrent: 'Real-time Regional Weather',
    weather9Day: '9-Day Forecast',
    stargazingIndex: 'Stargazing Index',
    conditionGood: 'Good',
    conditionFair: 'Fair',
    conditionPoor: 'Poor',
    cloud: 'Cloud',
    rain: 'Rain',
    temp: 'Temp',
    humidity: 'Humid',
    // Status Logic
    statusClear: 'Clear Skies',
    statusCloudy: 'Cloudy',
    statusRain: 'Rain/Storm',
    statusStable: 'Stable',
    reasonCloud: 'Clouds may obstruct view',
    reasonRain: 'Bad weather conditions',
    reasonMoon: 'Moon is too bright',
    reasonGood: 'Great conditions!',
    reasonFair: 'Conditions are okay',
    moonNew: 'New Moon',
    moonWaxCres: 'Waxing Crescent',
    moonFirstQ: 'First Quarter',
    moonWaxGib: 'Waxing Gibbous',
    moonFull: 'Full Moon',
    moonWanGib: 'Waning Gibbous',
    moonLastQ: 'Last Quarter',
    moonWanCres: 'Waning Crescent',
    // Astro Tips
    astroTip: 'ASTRO TIP',
    tipGood: "Conditions are great! Perfect time to observe nebulae and galaxies. Don't forget your red flashlight!",
    tipBad: "Visibility might be low. Focus on bright objects like the Moon or Planets, or use this time to study the Star Map!",
    // Knowledge
    knowSolar: 'Solar System Adventure',
    knowMoon: 'Moon Magic',
    knowStar: 'Secret of Stars',
    knowBlackHole: 'Black Holes',
    knowMeteor: 'Meteor Shower',
    knowComet: 'Comets',
    knowGalaxy: 'Galaxies',
    knowNebula: 'Nebulae',
    knowEclipse: 'Eclipses',
    knowConstellation: 'Constellations',
    
    solarDesc: 'Explore our planetary neighbors!',
    moonDesc: 'Why does the Moon change shape?',
    starDesc: 'Do colors mean temperature?',
    blackHoleDesc: 'The vacuum cleaners of space!',
    meteorDesc: 'Make a wish on a shooting star!',
    cometDesc: 'Icy snowballs with tails.',
    galaxyDesc: 'Our city of stars.',
    nebulaDesc: 'Where stars are born.',
    eclipseDesc: 'Shadows in space.',
    constellationDesc: 'Connect the dots in the sky.',

    // Constellation Game
    conGameLink: 'Connect the stars!',
    conGameComplete: 'Excellent!',
    conUrsaMajor: 'Ursa Major (Big Dipper)',
    conCassiopeia: 'Cassiopeia',
    conOrion: 'Orion',
    nextLevel: 'Next Level',
    restart: 'Restart',



    // Elaborations
    solarContext: 'Imagine a giant family running around a bonfire. The Sun is the fire, and the planets are the kids running around it!',
    moonContext: 'The Moon is like a ball that gets lit up by a flashlight (The Sun). As it moves around us, we see different parts lit up!',
    starContext: 'Stars are huge balls of fire. Just like a candle flame, the blue part is actually the hottest, and the red part is "cool"!',

    // Star Guide
    // Guide
    btnBack: 'Back',
    lblFind: 'How to Find',
    lblObserve: 'How to Observe',
    planetFact: 'Did You Know?',
    guideIntro: 'Explore famous stars and celestial objects. Tap on a card to learn more.',

    // Polaris
    guidePolaris: 'Polaris',
    guidePolarisSub: 'The North Star',
    guidePolarisDesc: 'Polaris is a very special star because it stays in almost the same spot in the sky while other stars rotate around it. It has been used by sailors for centuries to find North.',
    guidePolarisFind: 'Find the Big Dipper first. Draw a line through the outer two stars of the Dipper\'s bowl, and it points straight to Polaris.',
    guidePolarisObserve: 'It is a medium brightness star. Easy to see with the naked eye even in the city.',
    guidePolarisFact: 'Polaris is actually a triple star system, but the companions are too faint to see without a telescope.',

    // Sirius
    guideSirius: 'Sirius',
    guideSiriusSub: 'The Dog Star',
    guideSiriusDesc: 'Sirius is the brightest star in the night sky. Its name comes from the Greek word "Seirios," meaning "glowing" or "scorcher."',
    guideSiriusFind: 'Look for Orion\'s Belt (three stars in a row). Follow the line of the belt down to the left to find Sirius.',
    guideSiriusObserve: 'Shines very brightly with a blue-white color. It often twinkles with many colors when it is low in the sky.',
    guideSiriusFact: 'The phrase "Dog Days of Summer" refers to Sirius, because the ancients thought its heat added to the sun\'s heat in summer.',

    // Betelgeuse
    guideBetelgeuse: 'Betelgeuse',
    guideBetelgeuseSub: 'The Red Giant',
    guideBetelgeuseDesc: 'Betelgeuse is a massive red supergiant star. If it were placed at the center of our solar system, it would extend past the orbit of Jupiter!',
    guideBetelgeuseFind: 'It is the bright orange-red star at the top left shoulder of the Orion constellation.',
    guideBetelgeuseObserve: 'Distinctly orange-red to the naked eye. It is one of the easiest stars to recognize by color.',
    guideBetelgeuseFact: 'Betelgeuse will essentially explode as a supernova "soon" - which in astronomy means sometime in the next 100,000 years.',

    // Orion Nebula
    guideOrionNebula: 'Orion Nebula',
    guideOrionNebulaSub: 'Star Factory',
    guideOrionNebulaDesc: 'The Orion Nebula is a vast cloud of dust and gas where new stars are being born. It is one of the brightest nebulae visible to the naked eye.',
    guideOrionNebulaFind: 'Look below Orion\'s Belt for the "Sword" of Orion. The nebula is the fuzzy middle "star" of the sword.',
    guideOrionNebulaObserve: 'Looks like a fuzzy star to the naked eye. Binoculars reveal a faint gray mist. A telescope shows its fan shape.',
    guideOrionNebulaFact: 'It is about 24 light-years across. The light we see from it today left during the fall of the Roman Empire.',

    // Pleiades
    guidePleiades: 'Pleiades',
    guidePleiadesSub: 'The Seven Sisters',
    guidePleiadesDesc: 'Discussion of the Pleiades often leads to the question "how many stars can you see?". It is a beautiful open star cluster containing middle-aged, hot B-type stars.',
    guidePleiadesFind: 'Follow the line of Orion\'s belt upwards to the right, past Aldebaran, to find this small cluster of stars.',
    guidePleiadesObserve: 'Looks like a tiny dipper shape. Most people see 6 stars with the naked eye, but binoculars show dozens.',
    guidePleiadesFact: 'In Japan, this star cluster is known as "Subaru" and is the logo of the car manufacturer.',

    // Rigel
    guideRigel: 'Rigel',
    guideRigelSub: 'Blue Supergiant',
    guideRigelDesc: 'Rigel is the brightest star in Orion (brighter than Betelgeuse!). It is a young, hot, blue supergiant star.',
    guideRigelFind: 'It is the bright blue-white star at the bottom right foot of the Hunter (Orion).',
    guideRigelObserve: 'Shines with an intense blue-white light. Contrasts beautifully with orange Betelgeuse.',
    guideRigelFact: 'Rigel is so luminous that if it replaced our Sun, we would be instantly incinerated. It shines tens of thousands of times brighter than the Sun.',

    // Aldebaran
    guideAldebaran: 'Aldebaran',
    guideAldebaranSub: 'The Eye of Taurus',
    guideAldebaranDesc: 'Aldebaran is an orange giant star representing the angry eye of Taurus the Bull. Its name is Arabic for "The Follower" (it follows the Pleiades).',
    guideAldebaranFind: 'Follow the line of Orion\'s Belt up and to the right. The first bright orange star you hit is Aldebaran.',
    guideAldebaranObserve: 'Distinctly orange. It sits in a V-shaped star cluster called the Hyades, though it is not actually part of the cluster.',
    guideAldebaranFact: 'The Pioneer 10 spacecraft is heading towards Aldebaran and will arrive in about two million years.',

    // Arcturus
    guideArcturus: 'Arcturus',
    guideArcturusSub: 'Guardian of the Bear',
    guideArcturusDesc: 'Arcturus is the brightest star in the northern celestial hemisphere (4th brightest overall). It is an orange giant.',
    guideArcturusFind: 'Follow the arc of the Big Dipper\'s handle away from the bowl. "Arc to Arcturus!"',
    guideArcturusObserve: 'It twinkles with a golden-orange hue.',
    guideArcturusFact: 'Arcturus is not a local; it came from a dwarf galaxy that colliding with the Milky Way. It is zooming through our galaxy disk.',

    // Vega
    guideVega: 'Vega',
    guideVegaSub: 'Queen of Summer',
    guideVegaDesc: 'Vega is the brightest star in the Summer Triangle. It glows blue-white and was once our North Star.',
    guideVegaFind: 'Look for the brightest blue-white star near the zenith (overhead) in summer evenings.',
    guideVegaObserve: 'Very bright and blue-white. Astronomers use it as the standard "Zero Magnitude" star.',
    guideVegaFact: 'Due to Earth\'s wobble, Vega will become the North Star again around the year 14,000.',

    // Altair
    guideAltair: 'Altair',
    guideAltairSub: 'The Cowherd Star',
    guideAltairDesc: 'Altair is the head of Aquila the Eagle and one corner of the Summer Triangle. It spins incredibly fast!',
    guideAltairFind: 'In the Summer Triangle, look for the bright star flanked by two fainter stars on either side.',
    guideAltairObserve: 'A bright white star.',
    guideAltairFact: 'It spins so fast at its equator (900,000 km/h) that the star is flattened into an oval shape instead of a sphere.',

    // Antares
    guideAntares: 'Antares',
    guideAntaresSub: 'Rival of Mars',
    guideAntaresDesc: 'Antares is a red supergiant star marking the heart of Scorpius. Its name means "Anti-Ares" (Rival of Mars) because they look so similar.',
    guideAntaresFind: 'Look south in summer for a bright red star. If you see a fish-hook shape of stars, that\'s Scorpius.',
    guideAntaresObserve: 'Distinctly red. Compare its color to Mars when they are close in the sky.',
    guideAntaresFact: 'It is huge. If placed at the center of our solar system, its surface would swallow the orbit of Mars.',

    // Andromeda Galaxy
    guideAndromedaGalaxy: 'Andromeda Galaxy',
    guideAndromedaGalaxySub: 'Our Neighbor',
    guideAndromedaGalaxyDesc: 'The Andromeda Galaxy is the nearest major galaxy to the Milky Way. It is the most distant object visible to the naked eye (2.5 million light-years).',
    guideAndromedaGalaxyFind: 'Find the constellation Andromeda. Look for a fuzzy patch above the star Mirach. Best seen in autumn.',
    guideAndromedaGalaxyObserve: 'Looks like a faint, fuzzy cotton ball to the naked eye. Binoculars reveal an oval glow.',
    guideAndromedaGalaxyFact: 'It is rushing towards us at 110 km/s! It will collide with the Milky Way in about 4.5 billion years.',
    
    // New Content
    blackHoleContext: 'A Black Hole has gravity so strong that nothing, not even light, can escape! It pulls everything in like a giant drain.',
    meteorContext: 'Meteors are small rocks burning up as they hit Earth\'s air. They look like streaks of light!',
    cometContext: 'Comets are dirty snowballs from deep space. When they get close to the Sun, the ice melts and forms a beautiful tail.',
    galaxyContext: 'We live in the Milky Way Galaxy. It\'s a huge city of stars, gas, and dust spinning around together.',
    nebulaContext: 'A Nebula is a cloud of dust and gas. It\'s a nursery where baby stars are born!',
    eclipseContext: 'An Eclipse happens when the Moon gets exactly between the Sun and Earth, blocking the sunlight like a shadow puppet.',
    constellationContext: 'Long ago, people played "connect the dots" with stars to draw pictures of heroes and animals in the sky.',

    // Solar System
    // sun: 'Sun', // Already exists
    mercury: 'Mercury',
    venus: 'Venus',
    earth: 'Earth',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus',
    neptune: 'Neptune',
    planetFactSolar: 'Fun Fact',
    sunFact: 'The Sun is actually a star! It is the boss of the Solar System.',
    mercuryFact: 'Mercury is the smallest and fastest planet. A year is only 88 days!',
    venusFact: 'Venus is the hottest planet, even hotter than Mercury, due to thick clouds.',
    earthFact: 'Our Home! The only place we know that has life. Let\'s protect it!',
    marsFact: 'Mars is the Red Planet. We have sent many robots there to explore!',
    jupiterFact: 'Jupiter is the King! It is so big, 1300 Earths could fit inside.',
    saturnFact: 'Saturn has the most beautiful rings, made of ice and rocks.',
    uranusFact: 'Uranus spins on its side! It is an "Ice Giant".',
    neptuneFact: 'Neptune is the farthest away. It has super strong winds!',
    // Quiz
    quizTitle: 'Space Cadet Training',
    quizIntro: 'Ready to become a Space Explorer? Pass with 60% or more to earn your certificate!',
    quizStart: 'Start Mission',
    quizNext: 'Next',
    quizRetry: 'Play Again',
    quizScore: 'Score',
    quizRank: 'Rank',
    quizCorrect: 'Correct! Awesome! 🎉',
    quizWrong: 'Oops! Try again! 💪',
    quizComplete: 'Mission Complete!',
    
    // Certificate
    resultTitle: 'Quiz Results',
    enterName: 'Enter Name for Certificate',
    download: 'Download Certificate',
    certificate: 'Certificate of Achievement',
    certifiedBy: 'Kidrise Science Team',
    date: 'Date',
    certNamePlaceholder: 'Your Name...',
    good: 'Great job! You know your space stuff!',
    perfect: 'Perfect! You are a master of the universe!',
    tryAgain: 'Don\'t give up! Try again!',
    
    // Ranks
    rank1: 'Space Rookie',
    rank2: 'Star Explorer',
    rank3: 'Rocket Captain',
    rank4: 'Galactic Guardian',
    rank5: 'Universe Master',

    // Quiz UI
    quizQuestionCount: 'Question {0}/{1}',
    quizCurrentScore: 'Score: {0}',

    // Certificate Content
    certTitle: 'Certificate of Achievement',
    certCertifies: 'This certifies that',
    certCompleted: 'has successfully completed the STAR CADET TRAINING',
    certScore: 'with a score of',
    certDemonstrating: 'demonstrating excellent knowledge of the Telescope and Universe.',
    certDate: 'Date',
    certTeam: 'Kidrise Team',
    certOfficial: 'OFFICIAL',

    howToUse: {
        title: 'Star Map Guide',
        step1Title: '1. Select Time / Real-time',
        step1Desc: 'Tap [CLOCK] on the toolbar to set any date and time, or use "Real-time" to sync with now. Time Settings: Set date & time, or return to real-time.',
        step2Title: '2. Align Observation Time',
        step2Desc: 'Rotate the star dial to align the date (e.g. Oct 1) with the time (e.g. 9 PM). Use [SKY] or [PLUS] button to focus on the oval window, which shows the stars visible in Hong Kong at that moment.',
        step3Title: '3. Identify Direction',
        step3Desc: 'Tap [COMPASS] on the toolbar to check your orientation. Find the direction and then hold the Planisphere as shown below to name the constellations.',
        step4Title: '4. Observation Tips',
        step4Desc: 'When viewing the Northern sky, hold the map with "North" at the bottom and lift it overhead. The stars on the map will now match the real sky! To view other directions, just turn your body and rotate the map so that direction is at the bottom.',
        step5Title: 'App Controls',
        note: 'Web App Controls:\n\n1. [Time Travel]: Drag the black Star Disk, Date Ring, or simply slide anywhere on the black background to change time rapidly!\n2. [Move Map]: Drag the translucent outer frame to move the entire map.\n3. [Zoom]: Use your mouse wheel (Desktop) or pinch with two fingers (Mobile).'
    },
    mapStyleInfo: {
        western: 'IAU: Shows the 88 modern constellations defined by the IAU, with stars up to magnitude 4.',
        chinese: 'Chinese: Shows the traditional Chinese star asterisms (Three Enclosures and Twenty-Eight Mansions).',
        urban: 'Urban: Shows only the brighter stars and major constellations visible in light-polluted urban skies.'
    },

    // Questions
    q1: 'Which is the brightest star in the night sky?',
    q1a: ['Sirius', 'Vega', 'Polaris'],
    q2: 'Which planet is closest to the Sun?',
    q2a: ['Venus', 'Mars', 'Mercury'],
    q3: 'When the moon is round and bright, it is a...',
    q3a: ['New Moon', 'Full Moon', 'Crescent Moon'],
    q4: 'Which is the largest planet in our solar system?',
    q4a: ['Earth', 'Jupiter', 'Saturn'],
    q5: 'What is the name of our galaxy?',
    q5a: ['Andromeda', 'Milky Way', 'Black Eye'],
    q6: 'Which color star is the hottest?',
    q6a: ['Red', 'Yellow', 'Blue'],
    q7: 'How many moons does Earth have?',
    q7a: ['One', 'Two', 'Zero'],
    q8: 'Which planet is called the "Red Planet"?',
    q8a: ['Mars', 'Venus', 'Jupiter'],
    q9: 'What is the Sun mainly made of?',
    q9a: ['Oxygen', 'Hydrogen & Helium', 'Carbon Dioxide'],
    q10: 'Which planet has beautiful rings?',
    q10a: ['Saturn', 'Mars', 'Mercury'],
    q11: 'What is a shooting star (meteor) actually?',
    q11a: ['A falling star', 'Burning space rock', 'Alien spaceship'],
    q12: 'What has gravity so strong that not even light can escape?',
    q12a: ['Sun', 'Black Hole', 'Moon'],
    q13: 'When we look at stars, we are seeing them as they were...',
    q13a: ['In the past', 'In the future', 'Right now'],
    q14: 'Polaris (North Star) helps us find which direction?',
    q14a: ['South', 'North', 'East'],
    q15: 'In which year did humans first land on the Moon?',
    q15a: ['1969', '2000', '1800'],

    // Explanations
    q1_explain: 'Correct! Sirius is the brightest star we can see (besides the Sun). It\'s actually a binary star system!',
    q2_explain: 'That\'s right! Mercury is closest to the Sun. It gets super hot during the day but super cold at night because it has no atmosphere!',
    q3_explain: 'Correct! When we see a full round moon, that\'s a Full Moon. The sun is lighting up the whole side we can see.',
    q4_explain: 'Awesome! Jupiter is a giant! It\'s more than twice as massive as all the other planets combined.',
    q5_explain: 'Correct! We live in the Milky Way galaxy. It looks like a milky band of light stretching across the sky.',
    q6_explain: 'Right! Blue stars burn the hottest and fastest. Red stars are actually cooler than blue or yellow ones.',
    q7_explain: 'Correct! Earth has only one natural satellite: The Moon.',
    q8_explain: 'That\'s it! Mars is covered in iron oxide (rust/dust), which gives it that reddish-orange color.',
    q9_explain: 'Correct! The Sun is a giant ball of gas, mostly Hydrogen and Helium, burning in a nuclear reaction.',
    q10_explain: 'Right! Saturn\'s rings are famous and beautiful. They are made mostly of ice chunks and rock.',
    q11_explain: 'Correct! A shooting star is actually a small space rock burning up as it hits Earth\'s atmosphere.',
    q12_explain: 'Correct! Black holes have such strong gravity that nothing, not even light, can escape them!',
    q13_explain: 'Right! Because stars are so far away, light takes time to reach us. We are looking back in time!',
    q14_explain: 'Correct! Polaris sits almost directly above the North Pole, so it stays still while other stars circle it.',
    q15_explain: 'Correct! In 1969, Neil Armstrong became the first human to walk on the Moon. "One small step!"',

    // Moon Phase
    moonPhaseTitle: 'Drag the slider to see moon phases!',
    moonDay: 'Day',
    moonReasonNew: 'The Moon is between Earth and Sun. We can\'t see it!',
    moonReasonWax: 'The Moon is waking up, look at that crescent shape.',
    moonReasonFull: 'The Moon is opposite the Sun. Its face is fully lit!',
    moonReasonWan: 'The Moon is shrinking and going back to sleep.',
    // Star Color
    starColorTitleWhy: 'Why do stars have different colors?',
    starColorTitle: 'Star Color & Temp',
    tempLow: 'Cool (3,000°C)',
    tempMid: 'Medium (6,000°C)',
    tempHigh: 'Hot (25,000°C+)',
    starRed: 'Red Giant',
    starYellow: 'Like Sun',
    starBlue: 'Blue Giant',
    starColorDesc: 'Look! Even though red usually means hot on a tap, in space, Red stars are the coolest! Blue stars are actually the hottest!',
    // WIZARD GUIDE (Expanded to 8 steps)
    wizard: {
        steps: [
            {
                title: '1. Unboxing',
                desc: 'Open the box and check all parts: Main Tube, Tripod, Finder Scope, Eyepieces (H20, H6), Zenith Mirror, and Filters. Handle the glass lenses with care!',
                note: 'Lay everything out on a table before you start.'
            },
            {
                title: '2. Tripod Setup',
                desc: 'Spread the tripod legs fully and tighten the locking knobs. Ensure it is stable on the ground. If the ground is uneven, adjust the leg lengths.',
                note: 'A stable base is key to successful observation!'
            },
            {
                title: '3. Mounting the Tube',
                desc: 'Place the white optical tube onto the tripod mount. Align the screw hole and tighten the bottom knob. Hold the tube until it is secure so it doesn\'t slip.',
                note: 'Tighten firmly, but don\'t over-tighten.'
            },
            {
                title: '4. Finder Scope',
                desc: 'Locate the small bracket on top of the tube. Insert the Finder Scope (mini telescope) and tighten the screws. This is your "gun sight"!',
                note: 'Make sure the large lens of the finder is pointing forward.'
            },
            {
                title: '5. Eyepieces',
                desc: 'Insert the "Zenith Mirror" (90-degree elbow) into the back of the telescope. Then insert the lowest power eyepiece (marked "H20"). Tighten all screws.',
                note: 'Always start with the H20 eyepiece. Only switch to H6 after you find your target!'
            },
            {
                title: '6. Alignment (Daytime)',
                desc: 'Most Important Step! During the day, point the telescope at a distant object (like a tower tip). Center it in the main eyepiece. Then, adjust the FINDER SCOPE screws so the crosshairs are ALSO on the exact same point.',
                note: 'NEVER look at the Sun! Once aligned, finding stars at night is easy.'
            },
            {
                title: '7. First Light',
                desc: 'Take the telescope outside at night. Use the Finder Scope to aim at the Moon. Center it in the crosshairs. Look through the main eyepiece - the Moon should be there!',
                note: 'Turn the focus wheel slowly until craters look sharp.'
            },
            {
                title: '8. Troubleshooting',
                desc: 'Image upside down? That is normal for astronomical telescopes. If the image is blurry, try re-focusing. If it\'s pitch black, check if you removed the LENS CAP!',
                note: 'Patience is an astronomer\'s best virtue.'
            }
        ]
    },

    // Detailed Explanations
    expl: {
        // Black Hole
        blackHole: {
            what: 'A Black Hole is a super vacuum cleaner in space! Its gravity is so strong that even light cannot escape.',
            why: 'It forms when a huge star collapses under its own weight into a tiny point.',
            anim: 'The black circle in the middle is the "Event Horizon" - the point of no return. The glowing ring is gas freezing into it!'
        },
        // Meteor
        meteor: {
            what: 'A meteor is not a star, but a small space rock or dust crashing into Earth.',
            why: 'When it hits our air very fast, it gets super hot and glows, creating a streak of light.',
            anim: 'Watch the light streaks crossing the sky! Tap the sky to summon a meteor shower and make a wish.'
        },
        // Comet
        comet: {
            what: 'A comet is a "dirty snowball" from deep space, made of ice and dust.',
            why: 'When it gets near the Sun, the ice melts into gas, creating a long beautiful tail.',
            anim: 'See the white tail? It always points AWAY from the Sun (orange dot). Drag the slider to see the tail grow as it gets closer!'
        },
        // Galaxy
        galaxy: {
            what: 'A galaxy is a mega city of stars. Our Sun lives in a galaxy called the "Milky Way".',
            why: 'Gravity pulls billions of stars, gas, and dust together to spin around a center.',
            anim: 'This is a Spiral Galaxy. Change the tilt to see that it is flat like a frisbee!'
        },
        // Nebula
        nebula: {
            what: 'A Nebula is a beautiful cloud in space made of gas and dust.',
            why: 'Some nebulae are leftovers from dead stars, while others are nurseries where new stars are born!',
            anim: 'These colorful clouds are drifting slowly. In real space, colors represent different gases, like red hydrogen.'
        },
        // Eclipse
        eclipse: {
            what: 'A solar eclipse is when the Moon blocks the Sun.',
            why: 'The Moon moves between Earth and the Sun, casting a shadow on us.',
            anim: 'Drag the Moon (grey) to cover the Sun (orange). When totally covered (Totality), you see a glowing ring called the Corona!'
        },
        // Solar System
        solar: {
            what: 'The Solar System is the Sun\'s family. The Sun is in the center with 8 planets orbiting it.',
            why: 'The Sun is huge! Its gravity holds all the planets in their lanes (orbits).',
            anim: 'The lines are orbits. Tap on any planet to zoom in and learn a cool fact about it!'
        },
        // Moon Phases
        moonPhase: {
            what: 'Moon Phases are the changing shapes of the Moon we see.',
            why: 'The Moon doesn\'t actually change shape! It\'s just the Sun lighting up different parts as the Moon circles Earth.',
            anim: 'Drag the slider to pass time! Watch how the shadow moves across the Moon\'s face.'
        },
        // Star Colors
        starColor: {
            what: 'A star\'s color tells us its temperature. Just like fire!',
            why: 'Hotter fire is blue, and cooler fire is red. Stars work the same way!',
            anim: 'Drag the slider to change temperature. Watch it turn into a big Red Giant (cool) or a small Blue Star (hot)!'
        },
        // Space Scale
        spaceScale: {
            what: 'This tool shows you how much you would weigh on other planets.',
            why: 'Gravity is different everywhere! Jupiter pulls you down very hard (heavy), but the Moon pulls gently (light).',
            anim: 'Enter your weight to see the magic numbers. Check the "Jump Height" - you could be a superhero on the Moon!'
        }
    },


    // Space Scale
    scaleTitle: 'Space Scale',
    scaleDesc: 'See how much you would weigh on other planets!',
    enterWeight: 'Enter Your Weight (kg)',
    pluto: 'Pluto',

    // Star Colors
    starOrange: 'Orange',
    starWhite: 'White',
    tempCold: 'Cold',
    tempHot: 'Hot!',

    // Interactive Modules
    interactive: {
        tapCard: 'Tap a card to start your space adventure!',
        btnBack: 'Back',
        // Black Hole
        eventHorizon: 'Event Horizon Size',
        gravitySlider: 'Drag slider to change gravity!',
        // Meteor
        tapSky: 'Tap sky to make a wish!',
        // Comet
        orbitPos: 'Orbit Position',
        cometTip: 'Notice how the tail gets longer and brighter as it nears the Sun, and always points away!',
        // Galaxy
        tilt: 'Tilt Angle',
        rotation: 'Rotation Speed',
        // Nebula
        nursery: 'Stellar Nursery Simulation',
        // Eclipse
        totality: 'TOTALITY! 🌑',
        partial: 'Partial Eclipse 🌗',
        daytime: 'Daytime ☀️',
        eclipseSlider: 'Slide the Moon to cover the Sun!'
    },

    // TELESCOPE ENCYCLOPEDIA (Renamed from manual)
    encyclopedia: {
      title: 'EYES TO NEW HORIZONS',
      subtitle: 'AMAZING TELESCOPE: THE STARGAZER’S HANDBOOK',
      intro: 'A PRELIMINARY GUIDE TO THE NIGHT SKY',
      features: 'FEATURES',
      featuresDesc: 'Discover some of the amazing things. Find practical advice about how to find stars and constellations, planets, features of the Moon and lots more.',
      specs: '60X MAGNIFICATION | HD COATED LENS | EASY ASSEMBLY',
      kidrise: 'Kidrise',
      
      componentsTitle: 'Components of the telescope',
      caution: 'CAUTION: Do not observe the sun directly through the telescope.',
      partsList: [
        { name: 'H20 Eyepiece', qty: '1 pc', icon: 'fa-eye' },
        { name: 'H6 Moon Filter', qty: '1 pc', icon: 'fa-moon' },
        { name: 'Zenith Mirror', qty: '1 pc', icon: 'fa-share' },
        { name: 'Finder Scope', qty: '1 set', icon: 'fa-crosshairs' },
        { name: 'Compass', qty: '1 pc', icon: 'fa-compass' },
        { name: 'Tripod (39.5cm)', qty: '1 set', icon: 'fa-tripod' }
      ],
      parts: {
        eyepieceLock: 'Eyepiece Lock',
        objectiveLens: 'Objective Lens',
        lensHood: 'Lens Hood',
        mainMirror: 'Main Mirror',
        rotaryLock: 'Rotary Lock',
        hoop: 'Hoop',
        finder: 'Finder',
        eyepiece: 'Eyepiece',
        zenithMirror: 'Zenith Mirror',
        focusAdjustor: 'Focus Adjustor',
        tripod: 'Tripod',
        liftLock: 'Lift Lock',
        footTubeLock: 'Foot Tube Lock Button',
        plateBuckle: 'Plate Buckle',
        horseshoeFoot: 'Horseshoe Foot'
      },

      focusTitle: 'Focusing Guide',
      focusSteps: [
          { title: 'Find Target', desc: 'Point the tube at a target. Start with distant buildings to practice.' },
          { title: 'Adjust Focus', desc: 'Look through the eyepiece and slowly turn the focus wheel until the image is clear.' }
      ],
      focusNote: '💡 IMPORTANT: The telescope has a "Minimum Focus Distance" of about 20m. Objects closer than 20m cannot be focused. Also, images appearing upside down is normal for optical telescopes.',

      proTitle: '🔭 Professional Optics',
      proFeatures: [
          { title: 'Terrestrial & Celestial', desc: 'Suitable for viewing both land objects and night sky wonders.' },
          { title: '50mm Aperture', desc: 'Large aperture gathers more light for brighter, clearer images.' },
          { title: 'Multi-coated Lens', desc: 'Protects young eyes and improves light transmission.' },
          { title: '5x24 Finder Scope', desc: 'Helps locate objects quickly before viewing through the main tube.' }
      ],

      

      assemblyTitle: 'Telescope Assembly',
      assemblySteps: {
        1: '1. Base Rotary Lock Knob',
        2: '2. Eyepiece Installation',
        3: '3. Main Mirror Installation',
        4: '4. Hoop Installation',
        5: '5. Finder Installation'
      },
      
      nightSkyTitle: 'Night sky',
      nightSkyDesc: 'On a clear night, you can see thousands of stars in the sky. But what you see is just a tiny part of what’s out in space. As well as stars, there are planets, moons, clouds of gas and huge stretches of empty space.',
      measuringSpaceTitle: 'Measuring space',
      measuringSpaceDesc: 'Distances between most things in space are so huge that it’s difficult to imagine them. Scientists measure space distances in light years. One light year is 9.46 million million km, which is the distance light travels in a year.',
      
      brightStarsTitle: 'Bright stars',
      brightStarsDesc: 'Stars look like tiny bright lights in the night sky. They are huge balls of incredibly hot gas. But they look tiny because they are very, very far away. The Sun is our nearest star.',
      pleiadesDesc: 'This is a group of stars known as the Pleiades. It contains about 500 stars. It’s also known as the Seven Sisters because, on a clear night, you can see the seven brightest stars in the group with the naked eye.',
      
      galaxiesTitle: 'Galaxies',
      galaxiesDesc: 'Stars exist in enormous groups called galaxies, which are made up of billions of stars. You can see many galaxies with a powerful telescope, although some are too far away to see clearly.',
      
      planetsMoonsTitle: 'Planets and moons',
      planetsMoonsDesc: 'Planets are balls of rock or gas that move around, or orbit, a star. Earth is one of nine planets that orbit the Sun. Moons are balls of rock or ice that orbit planets. Earth has just one moon.',
      
      solarSystemTitle: 'Our Solar System',
      solarSystemDesc: 'The Sun, the planets and their moons, and everything else that orbits the Sun, are together known as the Solar System. The Sun keeps everything in orbit around it with a pulling force called gravity.',
      
      changingSkyTitle: 'Changing sky',
      changingSkyDesc: 'What we can see in the sky is constantly changing. For example, the stars seem to change position during the course of a night. These changes are caused by the Earth’s movements.',
      spinningEarthTitle: 'Spinning Earth',
      spinningEarthDesc: 'The Earth spins around once every 24 hours. As it spins, it looks as if the stars, Sun and Moon are moving around it.',
      
      whereOnEarthTitle: 'Where on Earth?',
      whereOnEarthDesc: 'It’s not just the Earth’s movement that affects which stars you can see, but also where you are on Earth. What you can see depends on which hemisphere you are in.',
      
      usingTelescopeTitle: 'Using telescopes',
      telescopeTypesDesc: 'There are two main types of telescopes: refractor and reflector telescopes.',
      refractorDesc: 'Refractor telescopes use lenses. Light enters the objective lens and is magnified by the eyepiece.',
      reflectorDesc: 'Reflector telescopes use mirrors to collect light.',
      
      powerTitle: 'Different powers',
      powerDesc: 'The larger a telescope’s objective lens or primary mirror is, the more powerful the telescope will be. Power is calculated by dividing focal length of objective by focal length of eyepiece.',
      
      observingTitle: 'Using your telescope',
      observingSteps: {
        1: '1. Begin with a low magnification eyepiece to see a wide section of sky.',
        2: '2. Use the finder telescope to line up the object in the center.',
        3: '3. Look through the main eyepiece and adjust the focus knob until clear.'
      },
      
      moonTitle: 'The Moon',
      moonDesc: 'The Moon is the second brightest object in the sky. It is covered with millions of hollows, or craters.',
      moonPhases: 'As the Moon orbits the Earth, we see different amounts of its sunlit side (Phases: New Moon, Crescent, Quarter, Gibbous, Full Moon).',
      
      eclipseTitle: 'Eclipses',
      eclipseDesc: 'Eclipses happen when Earth, Moon and Sun align. Solar eclipses: Moon blocks Sun. Lunar eclipses: Earth shadows Moon.',
      
      careTitle: 'TAKING CARE OF YOUR TELESCOPE',
      careDesc: 'Keep away from dust and moisture. Clean lenses with soft, non-abrasive cloth. Store in box when not in use.',
      
      footer: 'Kidrise STEM Educational Toys (HK) | www.stemtoy.com.hk'
    },
    // Button Legend
    buttonLegend: {
        title: 'Button Legend',
        time: 'Time Settings: Set date & time, or sync to real-time.',
        animation: 'Play/Pause: Control sky rotation animation.',
        speed: 'Speed: Adjust rotation speed (1x - 100x).',
        style: 'Map Style: Switch between IAU, Chinese, or Urban modes.',
        zoomIn: 'Zoom In: Get a closer look.',
        zoomOut: 'Zoom Out: See more area.',
        reset: 'Reset: Reset zoom to default (100%).',
        zoomSky: 'Sky View: Zoom to fit the visible sky.',
        guide: 'Usage Guide: Learn how to use the physical planisphere.',
        compass: 'Compass: Enable compass mode. Point phone at the sky!',
        legend: 'Legend: Show this help menu.',
        close: 'Close'
    },
    login: {
        title: 'Enter Access Code',
        desc: 'Enter the access code from your box to start the telescope adventure',
        placeholder: 'ENTER CODE',
        error: 'Invalid/Expired Code. Try again.',
        submit: 'START EXPLORING'
    }
  }
};
