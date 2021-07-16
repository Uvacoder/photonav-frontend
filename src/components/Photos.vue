<template>
    <div id="photos">
        <div class="thumbnail" v-for="(photo, key) in list" :key="key">
            <div class="image" :style="'background-image: url(' + getPhoto(photo) + ')'" @click="newTab(photo)"></div>
            <div class="options">{{ photo }}</div>
        </div>
    </div>
</template>

<script>
import api from "@/resources/api";

export default {
    props: {
        currentFolder: {
            type: String,
            default: ""
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getPhoto(photo) {
            return api.getPhoto(this.currentFolder + "/" + photo);
        },
        newTab(photo) {
            window.open(api.getPhoto(this.currentFolder + "/" + photo), "_blank");
        }
    }
}
</script>

<style scoped>
#photos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 30px 0;
}
#photos .thumbnail {
    width: 220px;
    padding: 10px;
    margin: 0 15px 30px;
    box-shadow: 0 0 8px var(--thumbnail-shadow);
}
#photos .image {
    height: 120px;
    background-size: cover;
    background-position: center;
    cursor: pointer;
}
#photos .options {
    padding-top: 10px;
    text-align: center;
    word-break: break-all;
}
</style>
