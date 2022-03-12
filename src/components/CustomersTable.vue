<template>
  <div v-if="!$auth.loading && $auth.isAuthenticated">
    <div class="search d-flex justify-space-between">
      <v-text-field
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        class="search-input"
        v-model="search"
        filled
        outlined
      />
      <v-select label="Сортировать по" class="search-input" filled outlined />
    </div>
    <v-data-table
      :items="preparedPerson"
      :headers="preparedHeaders"
      :items-per-page="ITEMS_PER_PAGE"
      hide-default-footer
      :search="search"
      :page.sync="page"
      class="mb-4"
    >
      <template v-slot:[`item.expiresAt`]="{ item }">
        <span v-if="item.isExpired" class="cellError"
          >{{ item.expiresAt }} (Истек)</span
        >
        <span v-else>{{ item.expiresAt }}</span>
      </template>
    </v-data-table>
    <div class="d-flex justify-end">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="6"
        color="#7242e6"
        class="elevation-0"
      ></v-pagination>
    </div>
  </div>
  <div v-else>Авторизуйтесь в меню наверху</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      token: null,
      persons: [],
      page: 1,
      ITEMS_PER_PAGE: 6,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Имя клиента",
          value: "fullName",
          cellClass: "cellAccent",
        },
        { text: "Номер лицензии", value: "licenseNumber" },
        { text: "Выдана", value: "issuedAt" },
        { text: "Срок действия", value: "expiresAt" },
        { text: "Штат", value: "state", cellClass: "cellAccent" },
      ],
    };
  },
  watch: {
    isAuthorized(to, from) {
      if (to && !from) {
        this.updatePersons();
      }
    },
  },
  computed: {
    isAuthorized() {
      console.log("here");
      console.log(this.$auth);
      return !this.$auth.loading && this.$auth.isAuthorized;
    },
    pageCount() {
      return Math.ceil(this.persons.length / this.ITEMS_PER_PAGE);
    },
    preparedHeaders() {
      return this.headers.map((h) => ({
        ...h,
        class: "headersClass",
        cellClass: `${h.cellClass} cellClass`,
      }));
    },
    preparedPerson() {
      return this.persons.map((p) => ({
        id: p.ID,
        fullName: p.FullName,
        licenseNumber: p.LicenseNumber,
        issuedAt: this.formatDate(p.IssuedAt),
        expiresAt: this.formatDate(p.ExpiresAt),
        isExpired: this.isExpired(p.ExpiresAt),
        state: p.State,
      }));
    },
  },
  methods: {
    async updatePersons() {
      this.token = await this.$auth.getTokenSilently();

      if (!this.token) return;

      const url = "https://test-unified.client-api.vyyer.id/api/v2/";
      axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
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
    },
    formatDate(date) {
      const ruDateTime = new Intl.DateTimeFormat("ru-RU");
      try {
        return ruDateTime.format(new Date(date));
      } catch (e) {
        return "Неправильный формат даты";
      }
    },
    isExpired(date) {
      try {
        return new Date() > new Date(date);
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.v-data-table >>> .headersClass {
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  text-transform: uppercase;
  font-weight: 700;
  color: #b5b5c3;
}
.v-data-table >>> .cellClass {
  font-size: 15px;
  line-height: 18px;
  padding: 24px 16px;
  font-weight: 700;
  color: #7e8298;
}
.v-data-table >>> .cellAccent {
  color: #141414;
}
.v-data-table >>> .cellError {
  color: #ff85b1;
}
.search-input {
  max-width: 281px;
}

.v-text-field >>> fieldset {
  border-style: none;
}
.v-text-field >>> .v-input__slot {
  background: #f5f8fa !important;
}
</style>
