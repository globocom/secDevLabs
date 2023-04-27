package types

type User struct {
	ID    string `json:"id" form:"id" query:"id"`
	Login string `json:"login" form:"login" query:"login"`
}

type UserLogin struct {
	ID       string `json:"id" form:"id" query:"id"`
	Login    string `json:"login" form:"login" query:"login"`
	Password string `json:"password" form:"password" query:"password"`
}

type UserRegister struct {
	Login          string `json:"login" form:"login" query:"login"`
	Password       string `json:"password" form:"password" query:"password"`
	RepeatPassword string `json:"repeatPassword" form:"repeatPassword" query:"repeatPassword"`
	FirstQuestion  string `json:"firstQuestion" form:"firstQuestion" query:"firstQuestion"`
	FirstAnswer    string `json:"firstAnswer" form:"firstAnswer" query:"firstAnswer"`
	SecondQuestion string `json:"secondQuestion" form:"secondQuestion" query:"secondQuestion"`
	SecondAnswer   string `json:"secondAnswer" form:"secondAnswer" query:"secondAnswer"`
}

type RecoveryPasswordQuestions struct {
	Login          string `json:"login" form:"login" query:"login"`
	FirstQuestion  string `json:"firstQuestion" form:"firstQuestion" query:"firstQuestion"`
	SecondQuestion string `json:"secondQuestion" form:"secondQuestion" query:"secondQuestion"`
}

type RecoveryPasswordAnswers struct {
	Login        string `json:"login" form:"login" query:"login"`
	FirstAnswer  string `json:"firstAnswer" form:"firstAnswer" query:"firstAnswer"`
	SecondAnswer string `json:"secondAnswer" form:"secondAnswer" query:"secondAnswer"`
}

type ChangePassword struct {
	Password       string `json:"password" form:"password" query:"password"`
	RepeatPassword string `json:"repeatPassword" form:"repeatPassword" query:"repeatPassword"`
}
