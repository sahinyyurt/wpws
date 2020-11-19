export async function checkNumberIsFoundInWP(phone: string): Promise<boolean> {
    try {
        const { ok } = await fetch(`https://wa.me/${phone}`);
        return ok;
    } catch {
        return false;
    }
}
