var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    }
})

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다'
    }
})

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
})

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'JavaScript 배우기' },
            { text: 'Vue 배우기' },
            { text: '무언가 멋진 것을 만들기' }
        ]
    }
})

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: '안녕하세요! Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: '안녕하세요 Vue!'
    }
})

//Vue에서 컴포넌트란 ==> 미리 정의된 옵션을 가진 Vue 인스턴스

// todo-item 이름을 가진 컴포넌트를 정의합니다
// Vue.component('todo-item', {
//     template: '<li>할일 항목 하나입니다.</li>'
// })

// var app7 = new Vue({
//     el: '#app-7',
//     data: {
//         list: [
//             { id: 0 },
//             { id: 1 },
//             { id: 2 }
//         ]
//     }
// })

//이것은 todo-item 컴포넌트를 사용할 때마다 똑같은 텍스트를 렌더링할뿐 무언가가 부족함.

Vue.component('todo-item', {
    // 이제 todo-item 컴포넌트는 "prop" 이라고 하는
    // 사용자 정의 속성 같은 것을 입력받을 수 있습니다.
    // 이 prop은 todo라는 이름으로 정의했습니다.
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})


var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
    }
})

var app8 = new Vue({
    el: "#app-8",
    data: {
        link:"https://naver.com"
    },
    methods: {
    }
})

var vm = new Vue({
    el: '#example',
    data: {
        message: '안녕하세요'
    },
    computed: {
        // 계산된 getter
        reversedMessage_c: function () {
            // `this` 는 vm 인스턴스를 가리킵니다.
            return this.message.split('').reverse().join('')
        },
        now: function () {
            return Date.now()
        }
    },
    methods: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }
    }

})


var vm = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName
        }
    }
})

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: '질문을 하기 전까지는 대답할 수 없습니다.'
    },
    watch: {
        // 질문이 변경될 때 마다 이 기능이 실행됩니다.
        question: function (newQuestion) {
            this.answer = '입력을 기다리는 중...'
            this.getAnswer()
        }
    },
    methods: {
        // _.debounce는 lodash가 제공하는 기능으로
        // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
        // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
        // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
        // _.debounce 함수(또는 이와 유사한 _.throttle)에 대한
        // 자세한 내용을 보려면 https://lodash.com/docs#debounce 를 방문하세요.
        getAnswer: _.debounce(
            function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = '질문에는 일반적으로 물음표가 포함 됩니다. ;-)'
                    return
                }
                this.answer = '생각중...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
                    })
            },
            // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
            500
        )
    }
})
