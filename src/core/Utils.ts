class Utils {
    isMobile(): boolean {
        const userAgent = navigator.userAgent;

        if ((typeof window !== 'undefined') && (['iPhone', 'Android'].includes(userAgent))) {
            return true;
        }
        
        return false;
    }
    sysdate(date: Date): string {
        const yy = date.getFullYear();
        const mm = ('0' + (date.getMonth() + 1)).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);

        return yy + mm + dd;
    }
    systime(date: Date): string {
        const hh = ('0' + date.getHours()).slice(-2); 
        const mm = ('0' + date.getMinutes()).slice(-2);
        const ss = ('0' + date.getSeconds()).slice(-2); 

        return hh + mm + ss;
    }
}

export default Utils.prototype;