import { reactive, ref, watch } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

// import thaiFont from '../fonts/Sarabun-Regular.ttf'

// Send to: Badges.vue
export const selectedBadge = ref('all');

// Send to: UpperDisplay.vue
function getSavedRate() {
    const data = localStorage.getItem('rate')
    if (data) {
        const savedRate = JSON.parse(data)
        return savedRate
    } else {
        return 0
    }
}

function getSavedShippingFee() {
    const data = localStorage.getItem('fee')
    if (data) {
        const savedFee = JSON.parse(data)
        return savedFee
    } else {
        return 0
    }
}

export const rate = ref(getSavedRate());
watch(rate, (newValue, _) => {
    localStorage.setItem('rate', JSON.stringify(newValue))
})


export const shippingFee = ref(getSavedShippingFee())
watch(shippingFee, (newValue, _) => {
    localStorage.setItem('fee', JSON.stringify(newValue))
})

// Send to: DataTable.vue
export interface ItemDetail {
    title: string
    price: number
    quantity: number
    subTotal: Function
}

const savedProducts = localStorage.getItem('products')


const getSavedData = () => {
    if (savedProducts) {
        const data = JSON.parse(savedProducts)
        data.forEach((product: any) => {
            product.subTotal = function () {
                return this.price * this.quantity;
            };
        });

        return data
    } else {
        return [];
    }
}
export const toggleEdit = ref(false)
const data = getSavedData()

// Send to: App.vue, DataTable.vue
export const products = ref<ItemDetail[]>([
    ...data
]);

watch(products.value, (newValue, _) => {
    localStorage.setItem('products', JSON.stringify(newValue))
}, { deep: true })




// Calculate the sum of subTotal values using reduce
export function totalSum() {
    return products.value.reduce((accumulator, item) => {
        return accumulator + item.subTotal();
    }, 0);
}

export function generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const table = document.getElementById('table') as HTMLElement;
    doc.setFontSize(14);
    doc.html(table, {
        callback: function (doc) {
            // Save the PDF
            doc.save('quotation-pdf.pdf');
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });

}

export const zoomOut = ref(false);

export async function saveAsImage() {
    const screenShot = document.getElementById('a4-layout') as HTMLElement;
    html2canvas(screenShot, { scale: 2 }).then((canvas) => {
        const image = canvas.toDataURL('png')
        const a = document.createElement('a') as HTMLAnchorElement;

        a.setAttribute('download', 'quotation.png');
        a.setAttribute('href', image);
        a.click();
    });
}

export const disabledButton = ref(false)
export const progressPercentage = ref(0)

export const loading = reactive({
    filePDF: false,
    filePNG: false,
    progressBar: false
})
export const modalToggle = ref(false);

export async function saveAsPDF() {
    const element = document.getElementById('a4-layout') as HTMLElement; // Replace with the ID of the element you want to capture

    const canvas = await html2canvas(element, {
        scale: 2, // Adjust scale factor for higher resolution (optional)
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new jsPDF instance with A4 dimensions

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    pdf.save('page_image.pdf'); // Save the PDF file
}

type DeviceType = 'mobile' | 'computer'
type FileExtension = 'pdf' | 'png'

export function downloadFile(device: DeviceType, extension: FileExtension) {

    if (device === 'mobile') {
        try {
            // Start
            disabledButton.value = true
            if (extension === 'pdf') {
                loading.filePDF = true
                // Processing
                saveAsPDF().then(() => {
                    // Done
                    setTimeout(() => {
                        disabledButton.value = false
                        loading.filePDF = false
                        modalToggle.value = false
                        Swal.fire({
                            title: 'ดาวโหลดเสร็จสิ้น',
                            icon: 'success',
                        });
                    }, 1000)
                })
            } else if (extension === 'png') {
                loading.filePNG = true;
                // Processing
                saveAsImage().then(() => {
                    // Done
                    setTimeout(() => {
                        disabledButton.value = false
                        loading.filePNG = false
                        modalToggle.value = false
                        Swal.fire({
                            title: 'ดาวโหลดเสร็จสิ้น',
                            icon: 'success',
                        });
                    }, 1000)
                })
            }
        } catch (err: any) {
            Swal.fire({
                title: 'Error',
                text: err,
                icon: 'error',
            });
        }
    } else if (device === 'computer') {
        try {
            modalToggle.value = true

        } catch (err: any) {
            Swal.fire({
                title: 'Error',
                text: err,
                icon: 'error',
            });
        }
    }
}


