import ActionSheet from 'actionsheet/actionsheet'
import Backdrop from 'backdrop/backdrop'
import CountUp from 'countup/countup'
import Dialog from 'dialog/dialog'
import Gallery from 'gallery/gallery'
import Loading from 'loading/loading'
import Picker from 'picker/picker'
import PickerCity from 'picker-city/picker-city'
import Prompt from 'prompt/prompt'
import Qrcode from 'qrcode/qrcode'
import Rater from 'rater/rater'
import Toast from 'toast/toast'
import Toptips from 'toptips/toptips'
import Xnumber from 'xnumber/xnumber'

export default function(scope) {
	return {
		$wuxActionSheet: new ActionSheet(scope).$wuxActionSheet, 
		$wuxBackdrop   : new Backdrop(scope).$wuxBackdrop, 
		$wuxCountUp    : new CountUp(scope).$wuxCountUp, 
		$wuxDialog     : new Dialog(scope).$wuxDialog, 
		$wuxGallery    : new Gallery(scope).$wuxGallery, 
		$wuxLoading    : new Loading(scope).$wuxLoading, 
		$wuxPicker     : new Picker(scope).$wuxPicker, 
		$wuxPickerCity : new PickerCity(scope).$wuxPickerCity, 
		$wuxPrompt     : new Prompt(scope).$wuxPrompt, 
		$wuxQrcode     : new Qrcode(scope).$wuxQrcode, 
		$wuxRater      : new Rater(scope).$wuxRater, 
		$wuxToast      : new Toast(scope).$wuxToast, 
		$wuxToptips    : new Toptips(scope).$wuxToptips, 
		$wuxXnumber    : new Xnumber(scope).$wuxXnumber, 
	}
}