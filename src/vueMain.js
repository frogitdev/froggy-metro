const vueContent = {
    template: `
        <main @click="font = font ? false : true" @dblclick="furigana = furigana ? false : true">
            <textarea v-model="rawText" @change="changeRoute"></textarea>
            <div>
                <div v-for="stn in stations" :key="stn.jpn" class="station">
                    <div class="name" :class="font ? 'round' : 'noto'" style="text-align: right;">
                        <div v-if="furigana" class="furigana">{{stn.kan}}</div>
                        <div :class="furigana ? 'mainname' : 'mainname-bigger'">{{stn.jpn}}</div>
                    </div>
                    <div class="vl" :style="{borderColor:stn.line}">
                        <div class="circle"></div>
                    </div>
                    <div class="name" style="font-family: sans-serif;">
                        {{kanaToRomaji(stn.kan)}}
                        <br>
                        {{stn.kor}}
                    </div>
                </div>
            </div>
        </main>
    `,
    el: '#screen',
    data: {
        rawText: '',
        font: false,
        furigana: true,
        stations: []
    },
    mounted() {
        this.rawText = sample
        this.changeRoute()
    },
    methods: {
        changeRoute() {
            let newStations = []
            this.rawText.split('\n').forEach((i) => {
                let j = i.split('\t')
                newStations.push({"line": j[0], "kor": j[1], "jpn": j[2], "kan": j[3]})
            })
            this.stations = newStations
        },
        kanaToRomaji(kana) {
            const rz = new Romanizer()
            return rz.romanize(kana)
        }
    }
}