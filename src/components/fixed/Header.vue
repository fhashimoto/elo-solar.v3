<template>
  <div class="header-wrapper">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      fixed
      left
      dark
      style="{z-index: 200}"
      v-show="drawer"
    >
      <v-btn large text @click="redirectHome()">
        <i class="fa fa-home mr-1" aria-hidden="true"></i>Home
      </v-btn>
      <v-btn large text @click="logout">
        <i class="fas fa-sign-out-alt mr-1"></i>LogOut
      </v-btn>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon
        absolute
        left
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <img
        class="logo"
        src="../../assets/elo-solar-logo.png"
        alt="logo elo solar"
        @click.stop="redirectHome()"
      />
      <!-- <v-img
        src="../../assets/elo-solar-logo.png"
        :max-height="isMobile ? 40 : 65"
        contain
        position="center center"
        style="cursor: pointer"
      ></v-img>-->
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isMobile: false,
      drawer: false,
    };
  },

  beforeDestroy() {
    if (typeof window !== undefined) {
      window.removeEventListener("resize", this.onResize);
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 960;
    },
    redirectHome() {
      const role = this.$store.state.user.roles.find((el: string) => el);
      switch (role) {
        case "SELLER":
          if (this.$route.path !== `/seller`) {
            this.$router.push("/seller");
          }          
          break;
        case "ENGINEER":
          if (this.$route.path !== `/engineer`) {
            this.$router.push("/engineer");
          }
          break;
        default:
          break;
      }
      this.drawer = false
    },
    logout() {
      this.$store.commit("logout");
      this.drawer = false;
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
});
</script>

<style lang="scss">
.v-list-item__title {
  padding-left: 5px;
}
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
.logo {
  height: 100%;
  cursor: pointer;
}
.v-toolbar__content {
  justify-content: center !important;
}
</style>
