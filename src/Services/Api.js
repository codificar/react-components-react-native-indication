export default class Api {
    constructor() {
        this.get = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        this.post = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }
    

    GetCheckingAccount(
        app_url,
        provider_id,
        token,
        start_date,
        end_date,
        type = 'provider'
    ) {
        let params = new URLSearchParams({
            provider_id: provider_id,
            id: provider_id,
            token: token,
            holder_type: type,
            start_date: start_date,
            end_date: end_date,
        });

        if (type == 'user')
            return fetch(
                app_url + '/libs/finance/user/financial/user_summary?' + params,
                this.get
            ).then((response) => response.json());

        return fetch(
            app_url +
                '/libs/finance/provider/financial/provider_summary?' +
                params,
            this.get
        ).then((response) => response.json());
    }

    
}
