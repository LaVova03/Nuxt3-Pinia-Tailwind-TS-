<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useToast } from 'vue-toastification';
import * as yup from "yup";

import getTodos from '~/api/getTodos';
import { useSliceStore } from '~/store/slice';

const toast = useToast();
const sliceStore = useSliceStore();

const showNotification = () => {
    if (sliceStore.isData && values.name && values.phone) {
        const data = sliceStore.isData;
        toast.success(`Congratulation ${values.name} \n id: ${data.id} \n title: ${data.title} \n phone: ${values.phone}`);
    }
    resetForm();
};

const schema = yup.object({
    name: yup.string().required("Введите имя"),
    phone: yup
        .string()
        .matches(/^\d+$/, "Телефон должен содержать только цифры")
        .required("Введите телефон"),
});

const { values, errors, handleSubmit, resetForm, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
        name: "",
        phone: "",
    },
});

const [name, nameAttrs] = defineField('name');
const [phone, phoneAttrs] = defineField('phone');

const onSubmit = (event: Event): void => {
    event.preventDefault();
    submitForm();
};

const submitForm = handleSubmit((): void => {
    (async () => {
        const data = await getTodos();
        if (data && data.id && data.title) {
            sliceStore.setData(data);
            showNotification();
        }
    })();
});
</script>

<template>
    <form @submit="onSubmit"
        class="flex flex-col lg:flex-row w-full lg:w-[80vw] justify-between bg-[#FAF0D7] p-[51px] md:p-[89px]">

        <div class="w-full lg:w-[46%] justify-between flex flex-col-reverse lg:flex-row">
            <div class="flex flex-row-reverse lg:flex-col justify-between mb-[44px] lg:mb-0">
                <ul class="flex flex-col h-[71px] justify-between">
                    <li class="text-[#435FDD] text-[20px] text-left font-bold">Телефон</li>
                    <li class="text-[18px] text-left">123-45-67</li>
                </ul>
                <ul class="flex flex-col h-[71px] justify-between">
                    <li class="text-[#435FDD] text-[20px] text-left font-bold">
                        Электронная почта
                    </li>
                    <li class="text-[18px] text-left">email@gmail.com</li>
                </ul>
            </div>
            <div class="flex flex-row lg:flex-col justify-between w-full lg:w-44 h-44 mb-[44px] lg:mb-0">
                <ul
                    class="flex w-full lg:h-full flex-wrap justify-between gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4">
                    <li class="flex justify:center items-center lg:justify-start lg:items-start order-2 lg:order-1">
                        <img src="/public/twitter.png" alt="Logo" width="64" height="64" />
                    </li>
                    <li class="flex justify:center items-center lg:justify-end lg:items-start order-3 lg:order-2">
                        <img src="/public/facebook.png" alt="Logo" width="64" height="64" />
                    </li>
                    <li class="flex justify:center items-center lg:justify-start lg:items-end order-4 lg:order-3">
                        <img src="/public/vk.png" alt="Logo" width="64" height="64" />
                    </li>
                    <li class="flex justify:center items-center lg:justify-end lg:items-end order-1 lg:order-4">
                        <img src="/public/instagramm.png" alt="Logo" width="64" height="64" />
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col w-full lg:w-[46%] justify-between">
            <ul class="flex flex-col lg:flex-row w-full justify-between">
                <li class="relative">
                    <input v-model="name" v-bind="nameAttrs"
                        class="w-full lg:w-[225px] h-[58px] rounded-[37px] pl-6 pr-6 outline-none mb-[44px] lg:mb-0"
                        placeholder="Ваше имя" type="text" />
                    <div v-if="errors.name" class="text-red-500 text-sm absolute top-[70px]">{{ errors.name }}</div>
                </li>
                <li class="relative">
                    <input v-model="phone" v-bind="phoneAttrs"
                        class="w-full lg:w-[225px] h-[58px] rounded-[37px] pl-6 pr-6 outline-none mb-[44px] lg:mb-0"
                        placeholder="Ваш телефон" type="text" />
                    <div v-if="errors.phone" class="text-red-500 text-sm absolute top-[70px]">{{ errors.phone }}</div>
                </li>
            </ul>
            <ul class="flex flex-col-reverse lg:flex-row w-full lg:justify-between">
                <li class="flex justify-start">
                    <button type="submit"
                        class="bg-[#FE4E4E] w-[225px] h-[58px] text-[18px] rounded-[37px] justify-center text-[#FFFFFF]">
                        Записаться
                    </button>
                </li>
                <li class="text-start text-[18px] leading-[27px] text-[#484848] mb-[44px] lg:mb-0">
                    Наш менеджер свяжется
                    <br />
                    с вами в течении дня
                </li>
            </ul>
        </div>
    </form>
</template>