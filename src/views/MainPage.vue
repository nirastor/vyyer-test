<template>
  <div>
    <UserProfile />
    <hr />
    <MainLayout />
    <div>Main Content Here</div>
    <div>{{ persons }}</div>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile";
import MainLayout from "@/components/MainLayout";
import axios from "axios";

export default {
  components: { UserProfile, MainLayout },
  data() {
    return {
      someData: null,
      persons: [],
    };
  },
  methods: {
    delay(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, delay);
      });
    },
  },
  async created() {
    // пока не разобрался как понять что this.$auth доступен
    await this.delay(2000);
    const token = await this.$auth.getTokenSilently();
    if (!token) return;

    const url = "https://test-unified.client-api.vyyer.id/api/v2/";
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["X-User-Id"] = "Auth0User";
    axios.defaults.headers.common["X-Org-Id"] = "Auth0Org";

    let scans;
    let persons;
    try {
      const res = await axios.get(url + "scans/get");
      scans = res.data.Data;
    } catch (e) {
      console.log(e);
    }

    console.log(scans);
    const IDs = scans.map((s) => s.IdentityID);
    const data = { IDs };

    try {
      const res = await axios.post(url + "identities/get", data);
      persons = res.data.Data;
    } catch (e) {
      console.log(e);
    }

    this.persons = persons;

    //   const myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Bearer ${token}`);
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("X-User-Id", "AuthUser");
    //   myHeaders.append("X-Org-Id", "AuthOrg");

    //   var raw = JSON.stringify({
    //     IDs: [1, 2, 3, 4, 5, 6],
    //   });

    //   const requestOptions = {
    //     method: "POST",
    //     mode: "cors",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //   };

    //   fetch(
    //     "https://test-unified.client-api.vyyer.id/api/v2/scans/get",
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
  },
};
</script>
