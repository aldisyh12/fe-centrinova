<template>
  <v-container>
    <v-row class="mt-16">
      <v-col cols="6" class="text-start">
        <h1>Selamat Data User</h1>
      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn variant="tonal" @click="onCreate">
          Buat Post
        </v-btn>
      </v-col>
      <v-col cols="12" class="mt-16 text-center">
        <v-table
            fixed-header
            height="300px"
        >
          <thead>
          <tr>
            <th class="text-center">
              Judul
            </th>
            <th class="text-center">
              Kategori
            </th>
            <th class="text-center">
              Description
            </th>
            <th class="text-center">
              Dibuat
            </th>
            <th class="text-center">
              Aksi
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in records"
              :key="item"
          >
            <td>{{ item.judul }}</td>
            <td>{{ item.categories }}</td>
            <td>{{ item.description }}</td>
            <td>{{ format_date(item.created_at) }}</td>
            <td>
              <v-btn color="primary" variant="flat" @click="handleEdit(item.id)">Edit</v-btn>
              &nbsp;
              <v-btn color="error" variant="flat" @click="handleDelete(item.id)">Hapus</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <div class="text-center">
          <v-pagination
              v-model="page"
              :length="6"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostUserService from "@/services/postUser.service";
import moment from "moment";

export default {
  name: "Index",
  data () {
    return {
      page: 1,
      records: [],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  mounted() {
    this.getRecordPost()
  },
  methods: {
    onCreate(){
      this.$router.push('/create/post');
    },
    handleEdit(id){
      this.$router.push(`/edit/post/${id}`);
    },
    format_date(value){
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },
    getRecordPost() {
      let payload = {
        limit: 10,
        searchBy: 'id',
        searchParam: '',
        page: 1
      }
      PostUserService.getPosts(payload)
          .then(response => {
            if (response.code === 200) {
              this.records = response.data.data;
            } else {
              console.log(response)
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    },
    handleDelete(id){
      PostUserService.deletePost(id)
          .then(response => {
            if (response.code === 200) {
              this.records = response.data;
            } else {
              console.log(response)
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }
  }
}
</script>

<style scoped>

</style>
