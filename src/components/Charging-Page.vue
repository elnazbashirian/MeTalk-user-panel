<template>
  <div class='main-container'>
    <div class='charging-cart'>
      <div class='charging-header'>
        <h3>افزایش اعتبار</h3>
        <h3>موجودی: {{ balance }}</h3>
      </div>
      <div class='line'></div>
      <div class='charging-body'>
        <div>مبلغ</div>
        <div class='body-input'>
          <input
              type='text'
              v-model="amount"
          />

        </div>
      </div>
      <div class='body-buttons'>
        <button @click="addToAmount(20000000)">20,000,000+</button>
        <button @click="addToAmount(10000000)">10,000,000+</button>
        <button @click="addToAmount(5000000)">5,000,000+</button>
      </div>
      <div class='charging-button'>
        <button @click="chargeBalance">افزایش اعتبار</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "../axios";

export default {
  name: "Charging-Page",
  data() {
    return {
      amount: "",
      balance: "",
    };
  },

  computed: {
    formattedAmount() {
      return this.formatNumber(this.amount);
    },
  },

  methods:{
    getBalance() {
      axios.get(`/wallet/balance`)
          .then(response => {
            this.balance = response.data.balance
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },

    formatNumber(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    addToAmount(value) {
      this.amount = (parseInt(this.amount) || 0) + value;
    },

    chargeBalance() {
      const formattedAmount = parseInt(String(this.amount).replace(/,/g, ''));
      if (isNaN(formattedAmount)) {
        console.error('Invalid amount entered.');
        return;
      }
      axios.post('/wallet/create-payment', { amount: formattedAmount })
          .then(response => {
            const paymentCode = response.data.paymentCode;
            window.location.href = `https://api.payping.ir/v2/pay/gotoipg/${paymentCode}`;
          })
          .catch(error => {
            console.error('Error creating payment:', error);
          });
    },
    updateFormattedAmount() {
      this.amount = this.formatNumber(this.amount.replace(/,/g, ''));
    },

  },


  created() {
    this.getBalance();
  },
}
</script>

<style scoped>

.line {
  --tw-bg-opacity: 1;
  border-bottom: 2px rgb(68 71 146 / var(--tw-bg-opacity)) solid;
}

.charging-cart {
  direction: rtl;
  background-color: white;
  width: 45%;
  --tw-bg-opacity: 1;
  border: 1px solid rgb(68 71 146 / var(--tw-bg-opacity));
  border-radius: 10px;
  margin: 2em auto;
}

.charging-header, .charging-body {
  padding: 1em;
}

.charging-header h3 {
  font-weight: 500;
}

.body-input {
  display: flex;
}

.body-input input {
  width: 100%;
  padding: .5em;
  margin-top: .3em;
  background-clip: padding-box;
  --tw-bg-opacity: 1;
  border: 1px solid rgb(68 71 146 / var(--tw-bg-opacity));
  text-align: center;
}

.body-input button {
  outline: none;
  padding: .5em;
  font-size: 1rem;
  background: rgba(var(--vs-primary),.1);
  color: rgba(var(--vs-primary),1);
  border: 1px solid rgba(var(--vs-primary),.1);
  margin-top: .3em;
  margin-right: .5em;
  width: 55px;
  height: 38px;
  top: 691px;
  left: 361px;
  border-radius: 8px

}

.body-buttons, .charging-button {
  display: flex;
  justify-content: space-between;
  padding: .7em;
}

.charging-button {
  justify-content: flex-end;
}

.body-buttons button {
  width: 32%;
  background: rgba(var(--vs-primary),.1);
  color: rgba(var(--vs-primary),1);
  padding: .7em;
  margin-bottom: .8em;
  border: 1px solid rgba(55, 50, 40, 0.54);
  border-radius: .4em;
  cursor: pointer;
}

.charging-button button {
  outline: none;
  --tw-bg-opacity: 1;
  background-color: rgb(68 71 146 / var(--tw-bg-opacity));
  border: 1px solid rgb(68 71 146 / var(--tw-bg-opacity));
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  padding: .8em;
  line-height: 1;
  border-radius: 8px;
  width: 20%;
}
.charging-button{
  background-color: #f0f0f0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.charging-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*background-color: #5e79f3;*/
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  --tw-bg-opacity: 1;
  background-color: rgb(68 71 146 / var(--tw-bg-opacity));
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>