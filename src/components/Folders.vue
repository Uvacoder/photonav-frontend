<template>
    <ul id="folders">
        <li v-if="list.length">Subpastas</li>
        <li v-else>Nenhuma subpasta</li>
        <li v-for="(folder, key) in list" :key="key">
            <a href="#" @click="changeFolder(folder)">{{ folder }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        currentFolder: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeFolder(folder) {
            const newFolder = (this.currentFolder === "/" ? "" : this.currentFolder ) + "/" + folder;
            this.$emit("change", newFolder);
        }
    }
}
</script>

<style scoped>
#folders {
    display: flex;
    padding: 10px 10px 0 10px;
    background-color: var(--folders);
    overflow-x: auto;
}
#folders li {
    padding: 0 0 10px 10px;
}
</style>
