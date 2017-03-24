import ActionSheet from 'actionsheet/actionsheet'
import Backdrop from 'backdrop/backdrop'
import Barcode from 'barcode/barcode'
import CountDown from 'countdown/countdown'
import CountUp from 'countup/countup'
import Dialog from 'dialog/dialog'
import Gallery from 'gallery/gallery'
import Loading from 'loading/loading'
import Picker from 'picker/picker'
import PickerCity from 'picker-city/picker-city'
import Prompt from 'prompt/prompt'
import Qrcode from 'qrcode/qrcode'
import Rater from 'rater/rater'
import Refresher from 'refresher/refresher'
import Seats from 'seats/seats'
import Toast from 'toast/toast'
import Toptips from 'toptips/toptips'
import Xnumber from 'xnumber/xnumber'

export default function() {
	return {
		$wuxActionSheet: ActionSheet, 
		$wuxBackdrop   : Backdrop, 
		$wuxBarcode    : (id, number, options) => new Barcode(id, number, options), 
		$wuxCountDown  : (options) => new CountDown(options), 
		$wuxCountUp    : (startVal, endVal, decimals, duration, options) => new CountUp(startVal, endVal, decimals, duration, options), 
		$wuxDialog     : Dialog, 
		$wuxGallery    : Gallery, 
		$wuxLoading    : Loading, 
		$wuxPicker     : Picker, 
		$wuxPickerCity : PickerCity, 
		$wuxPrompt     : Prompt, 
		$wuxQrcode     : Qrcode, 
		$wuxRater      : Rater, 
		$wuxRefresher  : (options) => new Refresher(options), 
		$wuxSeats      : Seats, 
		$wuxToast      : Toast, 
		$wuxToptips    : Toptips, 
		$wuxXnumber    : Xnumber, 
	}
}