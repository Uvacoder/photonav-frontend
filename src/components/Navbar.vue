<template>
    <ul id="navigation">
        <li>
            <a href="#" @click="rootFolder" id="home">Nossas Fotografias</a>
        </li>
        <li v-for="(folder, index) in getFolders" :key="index">
            &rarr;&nbsp;&nbsp;
            <strong v-if="index + 1 === getFolders.length">{{ folder }}</strong>
            <a v-else href="#" @click="changeFolder(index)">{{ folder }}</a>
        </li>        
    </ul>
</template>

<script>
export default {
    props: {
        currentFolder: {
            type: String,
            default: ""
        }
    },
    computed: {
        getFolders() {
            return this.currentFolder.substr(1).split("/");
        }
    },
    methods: {
        rootFolder() {
            this.$emit("change", "/");
        },
        changeFolder(index) {
            let path = "";
            for (let current = 0; current <= index; current++)
                path += "/" + this.getFolders[current];

            this.$emit("change", path);
        }
    }
}
</script>

<style scoped>
#navigation {
    display: flex;
    padding: 10px 10px 0 10px;
    background-color: var(--navbar);
    overflow-x: auto;
}
#navigation li {
    line-height: 20px;
    padding: 0 0 10px 10px;
    white-space: nowrap;
}
#home {
    font-weight: bold;
}
</style>
