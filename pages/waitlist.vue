<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="content column is-half is-offset-one-quarter">
        <h2>Some functionality is not yet available</h2>
        <p>
          The Web3 Suite Tools team would love to have you join our wait list,
          please sign up to be notified as new functionality is added. This
          information will only be used by the Web3 Suite Team and will not be
          shared with third parties.
        </p>
      </div>
      <div
        class="column is-half is-offset-one-quarter"
        v-if="!submitted && !error"
      >
        <b-field label="First Name" horizontal>
          <b-input v-model="firstName"></b-input>
        </b-field>
        <b-field label="Last Name" horizontal>
          <b-input v-model="lastName"></b-input>
        </b-field>
        <b-field label="Email" horizontal>
          <b-input type="email" v-model="email"></b-input>
        </b-field>
        <b-field
          label="Message"
          message="Feel free to leave a message if you would like!"
        >
          <b-input maxlength="200" type="textarea" v-model="message"></b-input>
        </b-field>
        <center>
          <button class="button is-primary" @click="addToWaitlist()">
            Add me please!
          </button>
        </center>
      </div>
      <div
        class="content column is-half is-offset-one-quarter"
        v-if="submitted"
      >
        <h2 class="notification is-success">
          Thank you for your interest {{ firstName }}! We will reach out to you
          at {{ email }} as new functionality is added!
        </h2>
      </div>
      <div class="content column is-half is-offset-one-quarter" v-if="error">
        <h2 class="notification is-danger">
          Eeek!! Very sorry {{ firstName }}.. something went wrong, could you
          try one more time?
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      submitted: false,
      error: false,
    };
  },
  methods: {
    async addToWaitlist() {
      const response = await this.$dataApi.addToWaitList(
        this.firstName,
        this.lastName,
        this.email,
        this.message
      );
      if (response.insertedId != "") {
        this.submitted = true;
      } else {
        this.error = true;
      }
    },
  },
  head() {
    return {
      title: "Waitlist",
      meta: [
        {
          name: "description",
          hid: "description",
          content:
            "The Web3 Suite Tools team would love to have you join our wait list, please sign up to be notified as new functionality is added.",
        },
      ],
    };
  },
};
</script> 