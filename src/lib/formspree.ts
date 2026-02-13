export const submitToFormspree = async (data: any, formId: string = 'mwvnladw') => {
    try {
        console.log('Submitting to Formspree:', { formId, data });

        const response = await fetch(`https://formspree.io/f/${formId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log('Formspree response status:', response.status);

        if (response.ok) {
            const result = await response.json();
            console.log('Formspree success:', result);
            return { success: true, data: result };
        } else {
            const errorData = await response.json();
            console.error('Formspree error:', errorData);
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Formspree submission failed:', error);
        return { success: false, error };
    }
};
