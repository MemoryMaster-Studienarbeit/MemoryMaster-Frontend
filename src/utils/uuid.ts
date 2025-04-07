export const validateOrCreateUUID = async (sessionId: string | undefined, navigate: (path: string) => void) => {
    try {
        const res = await fetch(`https://memorymaster.melonigemelone.de/api/uuid?session_uuid=${sessionId || "new"}`, {
            method: "POST",
        });

        if (!res.ok) {
            console.error("Backend Fehler:", res.statusText);
            return;
        }

        const session_uuid = await res.text();
        console.log("Backend Response:", session_uuid);
        const validUUID = session_uuid.slice(1, -1);

        if (sessionId !== validUUID) {
            navigate(`/${validUUID}`);
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der UUID:", error);
        navigate('*')
    }
};