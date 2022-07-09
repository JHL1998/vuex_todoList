import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputValue: '请输入内容',
        nextId: 5,
        viewKey: 'all'

    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        changeInputValue(state, value) {
            state.inputValue = value
        },
        addList(state, param) {
            const obj = {
                "id": state.nextId,
                "info": param,
                "done": false
            }
            state.list.push(obj)
            state.nextId++
        },
        deleteList(state, idx) {
            let id = state.list.findIndex((item) => item.id == idx)
            if (id !== -1) state.list.splice(id, 1)

        },
        changeStatus(state, obj) {
            let id = state.list.findIndex((item) => item.id === obj.id)
            if (id !== -1) {
                state.list[id].done = obj.status
            }
        },
        delAll(state) {
            state.list = state.list.filter((item) => item.done === false)
        },
        changeKey(state, status) {
            state.viewKey = status

        }

    },
    actions: {
        getList(context) {
            axios.get('/list.json')
                .then((response) => {
                    context.commit('initList', response.data)
                })
        }

    },
    modules: {},
    getters: {
        count(state) {
            return state.list.filter((item) => item.done === false).length
        },
        filterList(state) {
            if (state.viewKey === 'all') return state.list
            else if (state.viewKey === 'undone') return state.list.filter((item) => item.done === false)
            else return state.list.filter((item) => item.done === true)

        }
    }

})