<template>
    <div>
        <header id="topbar">
            <Navbar :currentFolder="currentFolder" @change="changeFolder" />
            <Folders :currentFolder="currentFolder" :list="folders" @change="changeFolder" />
            <Status :message="status.message" :variant="status.variant" />
        </header>
        <main id="main">
            <Photos :currentFolder="currentFolder" :list="photos" />
        </main>
        <footer id="footer">
            <a href="https://pauloklaus.com.br">pauloklaus.com.br</a> &bullet;
            <a href="https://github.com/pauloklaus/photonav-frontend">github</a>
        </footer>
    </div>
</template>

<script>
import api from "@/resources/api";
import Navbar from "@/components/Navbar";
import Folders from "@/components/Folders";
import Photos from "@/components/Photos";
import Status from "@/components/Status";

export default {
    components: { Navbar, Folders, Photos, Status },
    data() {
        return {
            status: {
                message: "",
                variant: ""
            },
            currentFolder: "/",
            folders: [],
            photos: [],
        }
    },
    created() {
        if (window.location.pathname)
            this.changeFolder(decodeURI(window.location.pathname));
        else
            this.listFolder();
    },
    methods: {
        setStatus(message, variant) {
            this.status.message = message;
            this.status.variant = variant;
        },
        async listFolder() {
            this.folders = [];
            this.photos = [];
            this.setStatus("", "");

            try {
                const response = await api.listFolder(this.currentFolder);

                if (!response.data)
                    return;

                this.folders = response.data.folders ?? [];
                this.photos = response.data.photos ?? [];

                history.pushState("", "", this.currentFolder);
            } catch (error) {
                this.setStatus(error.message, "alert");
            }
        },
        changeFolder(newFolder) {
            this.currentFolder = newFolder;
            this.listFolder();
        },
    },
}
</script>

<style>
#topbar {
    position: sticky;
    top: 0;
}
#footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--footer);
    padding: 15px 0 5px;
    text-align: center;
    font-size: 0.7rem;
}
</style>
