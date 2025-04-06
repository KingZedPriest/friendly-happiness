import { useCompetitorFormStore } from './../stores/useCompetitorForm';

export function checkCompetitorFormGroup(groupNumber: number): boolean {
    const data = useCompetitorFormStore.getState().data;

    switch (groupNumber) {
        case 1:
            return !!(data.fullName || data.emailAddress || data.phoneNumber);
        case 2:
            return !!data.profilePhoto;
        case 3:
            return !!data.aboutYou;
        case 4:
            return !!data.danceVideo;
        case 5:
            return !!data.story;
        case 6:
            return !!(data.howLong || data.danceType || data.discover);
        case 7:
            return !!data.why;
        default:
            return false;
    }
}

export function checkAllField(): boolean {
    const data = useCompetitorFormStore.getState().data;
    const result: boolean = !!(data.fullName || data.emailAddress || data.phoneNumber || data.profilePhoto || data.aboutYou || data.danceVideo || data.story || data.howLong || data.danceType || data.discover || data.why)
    return result
}