import { Language } from '../types';

export interface EncyclopediaSection {
    id: string;
    title: string;
    icon: string;
    content: EncyclopediaContent[];
}

export interface EncyclopediaContent {
    subtitle?: string;
    text: string;
    image?: string; // Placeholder for future images
    list?: string[];
    tips?: string;
}

export const encyclopediaData: Record<Language, EncyclopediaSection[]> = {
    'zh-HK': [
        {
            id: 'intro',
            title: '望遠鏡簡介',
            icon: 'fa-book-open',
            content: [
                {
                    subtitle: '望遠鏡的起源',
                    text: '望遠鏡是人類探索宇宙的眼睛。最早的望遠鏡於 1608 年由荷蘭眼鏡商漢斯·利普希 (Hans Lippershey) 申請專利。隨後，伽利略 (Galileo Galilei) 改進了設計，並首次將其指向天空，發現了木星的衛星和月球的環形山，徹底改變了我們對宇宙的認知。'
                },
                {
                    subtitle: '望遠鏡的原理',
                    text: '望遠鏡的主要功能不是「放大」物體，而是「收集光線」。它的物鏡（大鏡片）就像一個光線漏斗，將大量光線聚集到一個焦點上，再通過目鏡將影像放大進入我們的眼睛。口徑越大，收集的光線越多，看到的星星就越暗、越清晰。'
                }
            ]
        },
        {
            id: 'types',
            title: '望遠鏡種類',
            icon: 'fa-binoculars',
            content: [
                {
                    subtitle: '折射式 (Refractor)',
                    text: '這是最經典的望遠鏡類型，使用透鏡折射光線。優點是影像銳利、對比度高，且鏡筒封閉不易進塵，非常適合觀測月球、行星和雙星。缺點是會有「色差」（物體邊緣出現彩虹光圈），且大口徑造價昂貴。',
                    tips: 'Kidrise 的這款望遠鏡就是折射式喔！'
                },
                {
                    subtitle: '反射式 (Reflector)',
                    text: '由牛頓 (Isaac Newton) 發明，使用凹面鏡反射光線。優點是沒有色差，且都能以較低成本製造大口徑，適合觀測星雲、星系等深空天體。缺點是需要定期校準光軸 (Collimation)，且開放式鏡筒容易受氣流影響。'
                },
                {
                    subtitle: '折反射式 (Catadioptric)',
                    text: '結合了透鏡和反射鏡的優點（如施密特-卡塞格林式 SCT）。鏡身短小輕便，焦距卻很長，適合攜帶和多用途觀測。缺點是結構複雜，價格較高。'
                }
            ]
        },
        {
            id: 'structure',
            title: '結構解密',
            icon: 'fa-cogs',
            content: [
                {
                    subtitle: '光學鏡筒 (OTA)',
                    text: '望遠鏡的主體，包含物鏡、鏡筒和調焦座。它是收集光線的核心部件。'
                },
                {
                    subtitle: '赤道儀 (Equatorial Mount)',
                    text: '專為天文觀測設計的腳架雲台。它可以另一個軸對準北極星，只需轉動一根微調桿，就能抵消地球自轉，輕鬆追蹤星星。'
                },
                {
                    subtitle: '經緯儀 (Alt-Azimuth Mount)',
                    text: '最常見的腳架類型，只能上下左右移動。操作直觀簡單，適合初學者和地面觀測，但在高倍率下追蹤星星會比較困難（需要同時調整上下和左右）。'
                },
                {
                    subtitle: '尋星鏡 (Finder Scope)',
                    text: '安裝在主鏡筒上的小望遠鏡。它的視野很廣，中間有十字絲，用來幫助我們快速找到目標。因為主望遠鏡視野太窄，直接用它找星星就像用吸管看世界一樣困難！'
                }
            ]
        },
        {
            id: 'optics',
            title: '光學參數',
            icon: 'fa-microscope',
            content: [
                {
                    subtitle: '口徑 (Aperture)',
                    text: '物鏡的直徑，是望遠鏡最重要的指標！口徑越大，集光力越強，解析度越高，能看到的星星也越亮。'
                },
                {
                    subtitle: '焦距 (Focal Length)',
                    text: '物鏡到焦點的距離。焦距越長，放大倍率通常越高，但視野會變窄。'
                },
                {
                    subtitle: '焦比 (Focal Ratio)',
                    text: '焦距除以口徑 (f/值)。數值越小 (f/4, f/5) 代表「快鏡」，曝光時間短，適合深空攝影；數值越大 (f/10, f/12) 代表「慢鏡」，適合高倍率觀測行星。'
                },
                {
                    subtitle: '放大倍率 (Magnification)',
                    text: '計算公式：物鏡焦距 ÷ 目鏡焦距。例如 900mm 焦距的望遠鏡配上 20mm 目鏡，倍率就是 45 倍。注意：倍率不是越高越好！過高的倍率會讓影像變暗且模糊。最高有效倍率通常是口徑 (mm) 的 2 倍。'
                }
            ]
        },
        {
            id: 'accessories',
            title: '常用配件',
            icon: 'fa-tools',
            content: [
                {
                    subtitle: '目鏡 (Eyepiece)',
                    text: '就像望遠鏡的「放大鏡」。更換目鏡可以改變放大倍率。常見規格有 H (惠更斯)、K (凱爾納)、PL (普羅索) 等。'
                },
                {
                    subtitle: '巴罗镜 (Barlow Lens)',
                    text: '增倍鏡。如果寫著 "2X"，裝上它再裝目鏡，倍率就會變成原本的 2 倍！'
                },
                {
                    subtitle: '天頂鏡 (Diagonal)',
                    text: '折射鏡專用，將光路折射 90 度，讓你在觀測頭頂天體時不用蹲在地上扭斷脖子。通常會造成影像左右顛倒（鏡像）。'
                },
                {
                    subtitle: '濾鏡 (Filters)',
                    text: '太陽濾鏡（必須！）用於觀測太陽；月亮濾鏡用於減弱刺眼的月光；光害濾鏡用於在城市中增加星雲對比度。'
                }
            ]
        },
        {
            id: 'observation',
            title: '觀測技巧',
            icon: 'fa-star',
            content: [
                {
                    subtitle: '視寧度 (Seeing)',
                    text: '指大氣層的穩定程度。如果你看到星星閃爍得很厲害，代表大氣不穩定（視寧度差），這時候不適合觀測行星細節，適合看星團。'
                },
                {
                    subtitle: '光害 (Light Pollution)',
                    text: '城市燈光會照亮夜空背景，淹沒暗弱的星光。觀測深空天體（星雲、星系）最好去郊區。但月亮和行星在市區也能看得清楚。'
                },
                {
                    subtitle: '側視法 (Averted Vision)',
                    text: '觀測暗淡天體的秘技！不要直視目標，而是看目標稍微旁邊一點點的地方。利用視網膜周邊對光更敏感的細胞，你會驚訝地發現原本看不見的星雲突然出現了！'
                },
                {
                    subtitle: '適應黑暗',
                    text: '人眼需要約 20-30 分鐘才能完全適應黑暗。觀測時請關掉手機螢幕，或使用紅光手電筒，以免破壞夜視能力。'
                }
            ]
        },
        {
            id: 'maintenance',
            title: '保養與維護',
            icon: 'fa-wrench',
            content: [
                {
                    subtitle: '清潔鏡片',
                    text: '不到萬不得已，不要擦拭鏡片！一點點灰塵不會影響觀測。如果必須清潔，請使用專用氣吹吹走灰塵，再用光學拭鏡紙輕輕畫圈擦拭。'
                },
                {
                    subtitle: '存放',
                    text: '存放在乾燥通風的地方，避免發霉。如果鏡片起霧，不要立刻蓋上蓋子，讓它自然風乾後再收納。'
                }
            ]
        },
        {
            id: 'diy',
            title: 'DIY 與實驗',
            icon: 'fa-flask',
            content: [
                {
                    subtitle: '太陽投影實驗 (絕對安全)',
                    text: '千萬不要用眼睛直視太陽！你可以將望遠鏡對準太陽（不要看目鏡！），在目鏡後方放一張白紙。調節焦距，你就可以在白紙上清楚地看到太陽黑子！'
                },
                {
                    subtitle: '月球日記',
                    text: '每天觀察月亮，並畫下明暗交界線 (Terminator) 附近的坑洞。你會發現隨著農曆日期的變化，影子的長短會改變，坑洞的立體感也不同喔！'
                }
            ]
        }
    ],
    'en': [
        {
            id: 'intro',
            title: 'Introduction',
            icon: 'fa-book-open',
            content: [
                {
                    subtitle: 'Origin of the Telescope',
                    text: 'The telescope is humanity\'s eye to the universe. The earliest patent was filed in 1608 by Hans Lippershey. Galileo Galilei improved the design and turned it to the sky, discovering Jupiter\'s moons and lunar craters, forever changing our view of the cosmos.'
                },
                {
                    subtitle: 'How it Works',
                    text: 'The main function of a telescope is not to "magnify", but to "gather light". The objective lens acts like a light bucket, focusing photons into a single point, which is then magnified by the eyepiece. The larger the aperture, the more light it gathers.'
                }
            ]
        },
        {
            id: 'types',
            title: 'Types',
            icon: 'fa-binoculars',
            content: [
                {
                    subtitle: 'Refractor',
                    text: 'The classic design using lenses. Pros: Sharp images, high contrast, sealed tube. Great for moon and planets. Cons: Chromatic aberration (color fringing) and expensive for large sizes.',
                    tips: 'Your Kidrise telescope is a Refractor!'
                },
                {
                    subtitle: 'Reflector',
                    text: 'Invented by Newton, uses mirrors. Pros: No chromatic aberration, cheap to make big. Good for faint deep-sky objects. Cons: Needs collimation (alignment) and open tube exposes mirrors to dust.'
                },
                {
                    subtitle: 'Catadioptric',
                    text: 'Uses both lenses and mirrors (e.g., SCT). Pros: Compact tube with long focal length. Cons: Expensive and complex.'
                }
            ]
        },
        {
            id: 'structure',
            title: 'Structure',
            icon: 'fa-cogs',
            content: [
                {
                    subtitle: 'Optical Tube Assembly (OTA)',
                    text: 'The main body containing the lens/mirrors. The heart of the system.'
                },
                {
                    subtitle: 'Equatorial Mount (EQ)',
                    text: 'Designed for astronomy. Aligns with the North Star to track stars by rotating a single axis, countering Earth\'s rotation.'
                },
                {
                    subtitle: 'Alt-Azimuth Mount',
                    text: 'Moves Up-Down and Left-Right. Simple to use for beginners and terrestrial viewing, but harder to track stars at high power.'
                },
                {
                    subtitle: 'Finder Scope',
                    text: 'A mini-telescope with a wide field of view. Used to aim the main telescope. Finding stars without it is like looking through a straw!'
                }
            ]
        },
        {
            id: 'optics',
            title: 'Optics 101',
            icon: 'fa-microscope',
            content: [
                {
                    subtitle: 'Aperture',
                    text: 'Diameter of the main lens. The most important spec! Bigger aperture = brighter and sharper images.'
                },
                {
                    subtitle: 'Focal Length',
                    text: 'Distance from lens to focus point. Longer focal length usually means higher magnification potential.'
                },
                {
                    subtitle: 'Focal Ratio (f/)',
                    text: 'Focal Length divided by Aperture. Small number (f/5) is "Fast" (good for photos). Large number (f/10) is "Slow" (good for planets).'
                },
                {
                    subtitle: 'Magnification',
                    text: 'Formula: Telescope Focal Length / Eyepiece Focal Length. Note: Too much magnification makes the image dim and blurry. Max useful power is usually 2x the aperture in mm.'
                }
            ]
        },
        {
            id: 'accessories',
            title: 'Accessories',
            icon: 'fa-tools',
            content: [
                {
                    subtitle: 'Eyepieces',
                    text: 'Changeable lenses determining magnification. Common types: H (Huygens), K (Kellner), PL (Plossl).'
                },
                {
                    subtitle: 'Barlow Lens',
                    text: 'Multiplies magnification. A "2X Barlow" doubles the power of any eyepiece inserted into it.'
                },
                {
                    subtitle: 'Diagonal',
                    text: 'Bends light 90 degrees for comfortable viewing. Usually creates a mirror-reversed image.'
                },
                {
                    subtitle: 'Filters',
                    text: 'Solar Filter (Required for sun!), Moon Filter (reduces glare), Light Pollution Filter (improves contrast).'
                }
            ]
        },
        {
            id: 'observation',
            title: 'Skills',
            icon: 'fa-star',
            content: [
                {
                    subtitle: 'Seeing',
                    text: 'Atmospheric stability. If stars twinkle violently, the "seeing" is bad. Bad seeing blurs planetary details.'
                },
                {
                    subtitle: 'Light Pollution',
                    text: 'City lights wash out faint stars. Go to the countryside for nebulae/galaxies. Planets and Moon are fine in the city.'
                },
                {
                    subtitle: 'Averted Vision',
                    text: 'Look slightly to the side of the object. Your peripheral vision is more sensitive to low light!'
                },
                {
                    subtitle: 'Dark Adaptation',
                    text: 'Eyes take 20-30 mins to adapt to dark. Use red flashlights only!'
                }
            ]
        },
        {
            id: 'maintenance',
            title: 'Care',
            icon: 'fa-wrench',
            content: [
                {
                    subtitle: 'Cleaning',
                    text: 'Do not touch lenses! Dust doesn\'t hurt much. If needed, use an air blower and optical tissue gently.'
                },
                {
                    subtitle: 'Storage',
                    text: 'Keep in a dry, cool place to prevent mold. If the lens fogs up, let it air dry before capping.'
                }
            ]
        },
        {
            id: 'diy',
            title: 'DIY Lab',
            icon: 'fa-flask',
            content: [
                {
                    subtitle: 'Solar Projection',
                    text: 'NEVER look at the sun! Point telescope at sun (using shadow to aim), hold white paper behind eyepiece to see sunspots projected safely.'
                },
                {
                    subtitle: 'Moon Journal',
                    text: 'Sketch the moon craters along the shadow line (Terminator) each night. See how shadows change!'
                }
            ]
        }
    ]
};
