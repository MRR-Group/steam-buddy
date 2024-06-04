<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */
    "accepted" => "Pole :attribute musi zostać zaakceptowane.",
    "accepted_if" => "Pole :attribute musi zostać zaakceptowane, gdy :other jest :value.",
    "active_url" => "Pole :attribute musi być prawidłowym adresem URL.",
    "after" => "Pole :attribute musi być datą późniejszą niż :date.",
    "after_or_equal" => "Pole :attribute musi być datą równą lub późniejszą niż :date.",
    "alpha" => "Pole :attribute może zawierać tylko litery.",
    "alpha_dash" => "Pole :attribute może zawierać tylko litery, cyfry, myślniki i podkreślenia.",
    "alpha_num" => "Pole :attribute może zawierać tylko litery i cyfry.",
    "array" => "Pole :attribute musi być tablicą.",
    "ascii" => "Pole :attribute może zawierać tylko jednocytowe znaki alfanumeryczne i symbole.",
    "before" => "Pole :attribute musi być datą wcześniejszą niż :date.",
    "before_or_equal" => "Pole :attribute musi być datą równą lub wcześniejszą niż :date.",
    "between" => [
        "array" => "Pole :attribute musi mieć od :min do :max elementów.",
        "file" => "Pole :attribute musi mieć od :min do :max kilobajtów.",
        "numeric" => "Pole :attribute musi mieć wartość od :min do :max.",
        "string" => "Pole :attribute musi mieć od :min do :max znaków.",
    ],
    "boolean" => "Pole :attribute musi mieć wartość prawda lub fałsz.",
    "can" => "Pole :attribute zawiera niedozwoloną wartość.",
    "confirmed" => "Potwierdzenie pola :attribute nie pasuje.",
    "current_password" => "Hasło jest nieprawidłowe.",
    "date" => "Pole :attribute musi być prawidłową datą.",
    "date_equals" => "Pole :attribute musi być datą równą :date.",
    "date_format" => "Pole :attribute musi odpowiadać formatowi :format.",
    "decimal" => "Pole :attribute musi mieć :decimal miejsc dziesiętnych.",
    "declined" => "Pole :attribute musi zostać odrzucone.",
    "declined_if" => "Pole :attribute musi zostać odrzucone, gdy :other jest :value.",
    "different" => "Pole :attribute i :other muszą się różnić.",
    "digits" => "Pole :attribute musi mieć :digits cyfr.",
    "digits_between" => "Pole :attribute musi mieć od :min do :max cyfr.",
    "dimensions" => "Pole :attribute ma nieprawidłowe wymiary obrazu.",
    "distinct" => "Pole :attribute ma zduplikowaną wartość.",
    "doesnt_end_with" => "Pole :attribute nie może kończyć się jednym z następujących: :values.",
    "doesnt_start_with" => "Pole :attribute nie może zaczynać się jednym z następujących: :values.",
    "email" => "Pole :attribute musi być prawidłowym adresem email.",
    "ends_with" => "Pole :attribute musi kończyć się jednym z następujących: :values.",
    "enum" => "Wybrana wartość dla :attribute jest nieprawidłowa.",
    "exists" => "Wybrana wartość dla :attribute jest nieprawidłowa.",
    "extensions" => "Pole :attribute musi mieć jedno z następujących rozszerzeń: :values.",
    "file" => "Pole :attribute musi być plikiem.",
    "filled" => "Pole :attribute musi mieć wartość.",
    "gt" => [
        "array" => "Pole :attribute musi mieć więcej niż :value elementów.",
        "file" => "Pole :attribute musi być większe niż :value kilobajtów.",
        "numeric" => "Pole :attribute musi być większe niż :value.",
        "string" => "Pole :attribute musi mieć więcej niż :value znaków.",
    ],
    "gte" => [
        "array" => "Pole :attribute musi mieć :value lub więcej elementów.",
        "file" => "Pole :attribute musi być większe lub równe :value kilobajtów.",
        "numeric" => "Pole :attribute musi być większe lub równe :value.",
        "string" => "Pole :attribute musi mieć :value lub więcej znaków.",
    ],
    "hex_color" => "Pole :attribute musi być prawidłowym kolorem szesnastkowym.",
    "image" => "Pole :attribute musi być obrazem.",
    "in" => "Wybrana wartość dla :attribute jest nieprawidłowa.",
    "in_array" => "Pole :attribute musi istnieć w :other.",
    "integer" => "Pole :attribute musi być liczbą całkowitą.",
    "ip" => "Pole :attribute musi być prawidłowym adresem IP.",
    "ipv4" => "Pole :attribute musi być prawidłowym adresem IPv4.",
    "ipv6" => "Pole :attribute musi być prawidłowym adresem IPv6.",
    "json" => "Pole :attribute musi być prawidłowym ciągiem JSON.",
    "list" => "Pole :attribute musi być listą.",
    "lowercase" => "Pole :attribute musi być zapisane małymi literami.",
    "lt" => [
        "array" => "Pole :attribute musi mieć mniej niż :value elementów.",
        "file" => "Pole :attribute musi być mniejsze niż :value kilobajtów.",
        "numeric" => "Pole :attribute musi być mniejsze niż :value.",
        "string" => "Pole :attribute musi mieć mniej niż :value znaków.",
    ],
    "lte" => [
        "array" => "Pole :attribute nie może mieć więcej niż :value elementów.",
        "file" => "Pole :attribute musi być mniejsze lub równe :value kilobajtów.",
        "numeric" => "Pole :attribute musi być mniejsze lub równe :value.",
        "string" => "Pole :attribute musi mieć mniej lub równe :value znaków.",
    ],
    "mac_address" => "Pole :attribute musi być prawidłowym adresem MAC.",
    "max" => [
        "array" => "Pole :attribute nie może mieć więcej niż :max elementów.",
        "file" => "Pole :attribute nie może być większe niż :max kilobajtów.",
        "numeric" => "Pole :attribute nie może być większe niż :max.",
        "string" => "Pole :attribute nie może mieć więcej niż :max znaków.",
    ],
    "max_digits" => "Pole :attribute nie może mieć więcej niż :max cyfr.",
    "mimes" => "Pole :attribute musi być plikiem typu: :values.",
    "mimetypes" => "Pole :attribute musi być plikiem typu: :values.",
    "min" => [
        "array" => "Pole :attribute musi mieć co najmniej :min elementów.",
        "file" => "Pole :attribute musi mieć co najmniej :min kilobajtów.",
        "numeric" => "Pole :attribute musi mieć wartość co najmniej :min.",
        "string" => "Pole :attribute musi mieć co najmniej :min znaków.",
    ],
    "min_digits" => "Pole :attribute musi mieć co najmniej :min cyfr.",
    "missing" => "Pole :attribute musi być brakujące.",
    "missing_if" => "Pole :attribute musi być brakujące, gdy :other jest :value.",
    "missing_unless" => "Pole :attribute musi być brakujące, chyba że :other jest :value.",
    "missing_with" => "Pole :attribute musi być brakujące, gdy obecne jest :values.",
    "missing_with_all" => "Pole :attribute musi być brakujące, gdy obecne są :values.",
    "multiple_of" => "Pole :attribute musi być wielokrotnością :value.",
    "not_in" => "Wybrana wartość dla :attribute jest nieprawidłowa.",
    "not_regex" => "Format pola :attribute jest nieprawidłowy.",
    "numeric" => "Pole :attribute musi być liczbą.",
    "password" => [
        "letters" => "The :attribute field must contain at least one letter.",
        "mixed" => "The :attribute field must contain at least one uppercase and one lowercase letter.",
        "numbers" => "The :attribute field must contain at least one number.",
        "symbols" => "The :attribute field must contain at least one symbol.",
        "uncompromised" => "The given :attribute has appeared in a data leak. Please choose a different :attribute.",
    ],
    "present" => "The :attribute field must be present.",
    "present_if" => "The :attribute field must be present when :other is :value.",
    "present_unless" => "The :attribute field must be present unless :other is :value.",
    "present_with" => "The :attribute field must be present when :values is present.",
    "present_with_all" => "The :attribute field must be present when :values are present.",
    "prohibited" => "The :attribute field is prohibited.",
    "prohibited_if" => "The :attribute field is prohibited when :other is :value.",
    "prohibited_unless" => "The :attribute field is prohibited unless :other is in :values.",
    "prohibits" => "The :attribute field prohibits :other from being present.",
    "regex" => "The :attribute field format is invalid.",
    "required" => "The :attribute field is required.",
    "required_array_keys" => "The :attribute field must contain entries for: :values.",
    "required_if" => "The :attribute field is required when :other is :value.",
    "required_if_accepted" => "The :attribute field is required when :other is accepted.",
    "required_unless" => "The :attribute field is required unless :other is in :values.",
    "required_with" => "The :attribute field is required when :values is present.",
    "required_with_all" => "The :attribute field is required when :values are present.",
    "required_without" => "The :attribute field is required when :values is not present.",
    "required_without_all" => "The :attribute field is required when none of :values are present.",
    "same" => "The :attribute field must match :other.",
    "size" => [
        "array" => "The :attribute field must contain :size items.",
        "file" => "The :attribute field must be :size kilobytes.",
        "numeric" => "The :attribute field must be :size.",
        "string" => "The :attribute field must be :size characters.",
    ],
    "starts_with" => "The :attribute field must start with one of the following: :values.",
    "string" => "The :attribute field must be a string.",
    "timezone" => "The :attribute field must be a valid timezone.",
    "unique" => "The :attribute has already been taken.",
    "uploaded" => "The :attribute failed to upload.",
    "uppercase" => "The :attribute field must be uppercase.",
    "url" => "The :attribute field must be a valid URL.",
    "ulid" => "The :attribute field must be a valid ULID.",
    "uuid" => "The :attribute field must be a valid UUID.",

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    "custom" => [
        "attribute-name" => [
            "rule-name" => "custom-message",
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    "attributes" => [],
];
