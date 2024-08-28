import { ThemeModel } from "../models/theme";

export default {
    async getThemeList() {
        try {
            const themeList = await ThemeModel.find()
            return themeList;
        } catch (error) {
            console.error('Cannot fetch theme:', error);
            return { error: 'Failed to fetch theme' };
        }
    },
    
    
    
};